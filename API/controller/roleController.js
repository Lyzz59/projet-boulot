import Role from "../model/Role.js";

export async function getAllRoles(req, res) {
    try {
        const roles = await Role.getAll();
        res.status(200).json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}