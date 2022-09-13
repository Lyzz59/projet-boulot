import PrismaClient from "./Prisma.js";
import bcrypt from "bcrypt";

const { user, roleUser } = PrismaClient;

export default class User {
    constructor({
        firstName,
        lastName,
        email,
        password,
        rolesId = [],
        isActive,
    }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.rolesId = rolesId.map(roleId => ({ id: Number(roleId) }));
        this.isActive = isActive;
    }

    static async isEmailUsed(email) {
        const existingUser = await user.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            return false;
        } else {
            return true;
        }
    }

    async registration() {
        this.password = await bcrypt.hash(this.password, 10);
        const newUser = await user.create({
            data: {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                roles: {
                    connect: this.rolesId
                },
                isActive: this.isActive,
            }
        });
        return newUser;
    }

    static async login(email) {
        const foundUser = await user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                password: true,
                isActive: true,
                roles: true
            }
        })
        return foundUser;
    }

    static async update(userId, data) {

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const userUpdate = await user.update({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password ? data.password : undefined,
                roles: {
                    set: [],
                    connect: data.rolesId.map(roleId => ({ id: Number(roleId) }))
                },
                isActive: data.isActive,
            },
            where: {
                id: userId
            }
        });

        return userUpdate;
    }

    static async getAll() {
        const users = await user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                isActive: true,
                roles: true
            }
        });
        return users;
    }

    static async deleteOne(userId) {
        await user.delete({
            where: {
                id: userId,
            },
        });
    }
}