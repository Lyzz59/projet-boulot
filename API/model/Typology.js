import PrismaClient from "./Prisma.js";

const { typology } = PrismaClient;

export default class Typology {
    constructor({ name }) {
        this.name = name;
    }

    static async getAll() {
        const typologys = await typology.findMany();
        return typologys;
    }
}