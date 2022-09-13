import Client from "../model/Client.js";

export async function createClient(req, res) {
    const data = req.body;
    try {
        const newClient = new Client(data);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function getAllClients(req, res) {
    try {
        const clients = await Client.getAll();
        res.status(200).json(clients);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function updateClient(req, res) {
    const clientId = Number(req.params.clientId);
    const data = req.body;

    try {
        await Client.update(clientId, data);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function deleteClient(req, res) {
    const clientId = Number(req.params.clientId);
    try {
        await Client.deleteOne(clientId);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}