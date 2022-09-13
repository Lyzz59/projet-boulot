import prismaClient from "../model/Prisma.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const clients = [
    { id: 1, company: "Hbec", phone: "0301020405", email: "hbec@email.fr", address: "1 rue de hbec, 59000 Nord" },
    { id: 2, company: "DirectMat", phone: "0301020405", email: "directmat@email.fr", address: "2 route de directmat, 59111 MatNord" },
    { id: 3, company: "Margaret", phone: "0301020405", email: "margaret@email.fr", address: "3 chemin de margaret, 59202 Douchy" },
];
const projects = [{
        id: 1,
        name: "Hbec",
        clientId: 1,
        timeSold: 500
    },
    {
        id: 2,
        name: "DirectMat",
        clientId: 2,
        timeSold: 800
    },
    {
        id: 3,
        name: "Margaret",
        clientId: 3,
        timeSold: 600
    },
];
const roles = [
    { id: 1, label: "admin" },
    { id: 2, label: "user" },
];

const typologys = [
    { id: 1, name: "TMA" },
    { id: 2, name: "Site vitrine" },
    { id: 3, name: "Site e-commerce" },
    { id: 4, name: "Application" },
];

const users = [{
    id: 20,
    firstName: "Stéphane",
    lastName: "Roger",
    email: "stephane@code.fr",
    password: bcrypt.hashSync(
        "password", 10
    ),
    rolesId: [1],
    isActive: true,

}];

async function main() {
    await prismaClient.client.createMany({
        data: clients,
        skipDuplicates: true,
    });
    await prismaClient.project.createMany({
        data: projects,
        skipDuplicates: true,
    });
    await prismaClient.role.createMany({
        data: roles,
        skipDuplicates: true,
    });
    await prismaClient.typology.createMany({
        data: typologys,
        skipDuplicates: true,
    });
    users.forEach(async(user) => {

        const usercreate = await prismaClient.user.create({
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                roles: {
                    connect: user.rolesId.map(roleId => ({ id: Number(roleId) })),
                },
                isActive: user.isActive,
            }
        });
        // console.log(usercreate);

    })
}

main();