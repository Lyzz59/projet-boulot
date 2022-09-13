import PrismaClient from "./Prisma.js";

const { timeTracking } = PrismaClient;

export default class TimeTracking {
    constructor({ valeur, projectId, typologyId, userId, description, createdAt }) {
        this.valeur = valeur;
        this.projectId = Number(projectId);
        this.typologyId = Number(typologyId);
        this.userId = userId;
        this.description = description;
        this.createdAt = new Date(createdAt);
    }

    static async getByUserId(id, createdAt) {
        const timeTrackingUserId = await timeTracking.findMany({
            select: {
                id: true,
                valeur: true,
                project: true,
                typology: true,
                user: true,
                description: true,
                createdAt: true,
            },
            where: {
                userId: id,
                createdAt: {
                    gte: new Date(createdAt),
                }
            },
            orderBy: [{
                    createdAt: 'desc',
                },
                {
                    id: 'desc',
                }
            ]
        })
        return timeTrackingUserId;
    }

    static async getAll(weekNumber) {
        const weekDays = this.getWeekDays(weekNumber);
        const start = weekDays[0];
        const end = weekDays[6];
        end.setDate(end.getDate() + 1);

        console.log(weekDays);
        const timeTrackings = await timeTracking.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
        });

        return timeTrackings;
    }

    static getWeekDays(week) {
        const januaryFour = new Date(new Date().getFullYear(), 0, 4);
        const firstDayOfFirstWeek = new Date(januaryFour);
        firstDayOfFirstWeek.setDate(
            firstDayOfFirstWeek.getDate() - firstDayOfFirstWeek.getDay() + 1
        );
        const manipulatedDate = new Date(firstDayOfFirstWeek);
        manipulatedDate.setDate(manipulatedDate.getDate() + (week - 1) * 7);
        const weekDays = [];
        manipulatedDate.setDate(
            manipulatedDate.getDate() - manipulatedDate.getDay() + 1
        );
        for (var i = 0; i < 7; i++) {
            weekDays.push(new Date(manipulatedDate));
            manipulatedDate.setDate(manipulatedDate.getDate() + 1);
        }
        return weekDays;
    }

    async save() {
        await timeTracking.create({
            data: {
                valeur: this.valeur,
                projectId: this.projectId,
                typologyId: this.typologyId,
                userId: this.userId,
                description: this.description,
                createdAt: this.createdAt,
            }
        });
    }

    async update(id) {
        await timeTracking.update({
            data: {
                valeur: this.valeur,
                projectId: this.projectId,
                typologyId: this.typologyId,
                description: this.description,
                createdAt: this.createdAt,
            },
            where: { id: id }
        })
    }

    static async deleteOne(id) {
        await timeTracking.delete({
            where: {
                id: id,
            }
        })
    }
}