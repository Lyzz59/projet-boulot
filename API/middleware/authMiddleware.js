import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        res.locals.user = decodedToken;
        next()
    } catch (error) {
        console.log(error);
        res.status(403).end();
    }
}