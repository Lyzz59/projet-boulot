import PrismaClient from "./Prisma.js";

const { project } = PrismaClient;

export default class Project {
    constructor({
        name,
        clientId,
        timeSold = 0,
        isActive = true,
    }) {
        this.name = name;
        this.clientId = Number(clientId);
        this.timeSold = Number(timeSold);
        this.isActive = isActive;
    }
    async save() {
        await project.create({
            data: {
                name: this.name,
                clientId: this.clientId,
                timeSold: this.timeSold,
                isActive: this.isActive,
            }
        });
    }

    static async getAllForTimeTracking() {
        const projects = await project.findMany({
            select: {
                id: true,
                name: true
            },
            where: {
                isActive: true,
            },
            orderBy: {
                name: "asc",
            }
        });
        return projects;
    }

    static async getAllForGestionAdmin() {
        let projects = await project.findMany({
            select: {
                id: true,
                name: true,
                client: true,
                timeSold: true,
                timeTrackings: {
                    select: {
                        valeur: true
                    }
                },
                isActive: true,
            },
            orderBy: {
                name: "asc",
            }
        });
        projects = projects.map(this.formatProject);
        return projects;
    }

    static async getAllActive() {
        let projects = await project.findMany({
            select: {
                id: true,
                name: true,
                client: true,
                timeSold: true,
                timeTrackings: {
                    select: {
                        valeur: true
                    }
                },
            },
            where: {
                isActive: true,
            },
            orderBy: {
                name: "asc",
            }
        });
        projects = projects.map(this.formatProject);
        return projects;
    }

    static formatProject(project) {
        const hoursToDays = {
            7: 1,
            6: 0.86,
            5: 0.71,
            4: 0.57,
            3: 0.43,
            2: 0.29,
            1: 0.14,
            0: 0
        };
        const totalMinutes = project.timeTrackings.reduce((total, elem) => total + elem.valeur, 0);

        const totalHours = Math.round(totalMinutes / 60);

        let totalDays = Math.trunc(totalHours / 7);

        totalDays += hoursToDays[totalHours % 7];
        totalDays = totalDays.toFixed(2);

        const difference = Math.round((totalDays / project.timeSold) * 100);
        const formatedProject = {
            ...project,
            timeConsumed: Number(totalDays),
            timeDifference: difference
        };
        return formatedProject;
    }

    async update(projectId) {
        const projectUpdate = await project.update({
            data: {
                name: this.name,
                clientId: this.clientId,
                timeSold: this.timeSold,
                isActive: this.isActive,
            },

            where: {
                id: projectId
            }
        });
        return projectUpdate;
    }

    static async deleteOne(projectId) {
        await project.delete({
            where: {
                id: projectId
            }
        });
    }
}