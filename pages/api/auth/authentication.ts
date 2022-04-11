import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { comparePasswords } from '../../../utils/crypto';

export interface LoginPayload {
    username: string
    password: string
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
    const payload: LoginPayload = req.body;

    if (!payload.username && !payload.password) {
        return res.status(400).send({ message: "Username e password mancanti "});
    }

    if (!payload.username) {
        return res.status(400).send({ message: "Username mancante "});
    }
    
    if (!payload.password) {
        return res.status(400).send({ message: "Password mancante" });
    }

    try {
        let { db } = await connect();
        const user = await db.collection('users').findOne({
            $or: [
                { username: payload.username },
                { email: payload.username }
            ]
        });

        console.log(user);


        if (!await comparePasswords(payload.password, user.password)) {
            return res.status(400).send({ message: "La password è errata!" });
        }

        let token /*= await createToken(user).then(jwt => jwt)*/;

        return res.status(200).json({token})
    } catch (err) {
        /*if (err instanceof Unauthorized) {
            return res.status(err.statusCode).send(err.message)
        }*/
        return res.status(500).send({ message: "Errore di autenticazione" })
    }
}

export async function register(req: NextApiRequest, res: NextApiResponse) {

}