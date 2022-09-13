import Typology from "../model/Typology.js";

export async function getAllTypology(req, res) {
    try {
        const typologys = await Typology.getAll();
        res.status(200).json(typologys);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}