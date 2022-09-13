import PrismaClient from "./Prisma.js";

const { client } = PrismaClient;

export default class Client {
    constructor({ company, phone, email, address }) {
        this.company = company;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }
    async save() {
        await client.create({
            data: {
                company: this.company,
                phone: this.phone,
                email: this.email,
                address: this.address,
            }
        });
    }

    static async getAll() {
        const clients = await client.findMany();
        return clients;
    }

    static async update(clientId, data) {
        const clientUpdate = await client.update({
            data: data,
            where: {
                id: clientId,
            }
        });
        return clientUpdate;
    }


    static async deleteOne(clientId) {
        await client.delete({
            where: {
                id: clientId,
            }
        })
    }
}