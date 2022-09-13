import PrismaClient from "./Prisma.js";

const { role } = PrismaClient;

export default class Role {
    constructor({ label }) {
        this.label = label;
    }

    static async getAll() {
        const roles = await role.findMany();
        return roles;
    }
}