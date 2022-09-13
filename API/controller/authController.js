import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    const loginForm = req.body;
    try {
        const foundUser = await User.login(loginForm.email);
        if (foundUser === null) {
            res.status(403).json({ message: "Mot de passe ou identifiant incorrect" });
            return;
        }

        if (!foundUser.isActive) {
            res.status(403).json({ message: "Compte désactivé" });
            return;
        }

        if (await bcrypt.compare(loginForm.password, foundUser.password) !== true) {
            res.status(403).json({ message: "Mot de passe ou identifiant incorrect" });
            return;
        }

        const payload = {
            id: foundUser.id,
            rolesId: foundUser.roles.map((role) => role.id),
        }

        const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: 60 * 60 * 2 });

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}