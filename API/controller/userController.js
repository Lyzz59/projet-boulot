import User from "../model/User.js";

export async function registration(req, res) {
    const data = req.body;
    //  console.log(data);
    try {
        const newUser = new User(data);
        const isEmailUsed = await User.isEmailUsed(newUser.email);
        if (isEmailUsed) {
            res.status(500).json({
                message: "email déjà utilisé"
            })
            return
        }
        const createdUser = await newUser.registration();
        res.json(createdUser);

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }

}

export async function getAllUsers(req, res) {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
export async function updateUser(req, res) {
    const userId = Number(req.params.userId);
    const data = req.body;
    try {
        await User.update(userId, data);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function deleteOne(req, res) {
    const userId = Number(req.params.userId);
    try {
        await User.deleteOne(userId);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}