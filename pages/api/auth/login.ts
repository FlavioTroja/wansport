import { UserModel } from './../../../models/user';
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { comparePasswords } from '../../../utils/crypto';
import jwt from "jwt-simple";
import moment from "moment";


export interface LoginPayload {
    username: string
    password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
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
        const user: Promise<UserModel> | any = await db.collection('users').findOne({
            $or: [
                { username: payload.username },
                { email: payload.username }
            ]
        });

        if (!await comparePasswords(user.password, payload.password)) {
            return res.status(400).send({ message: "La password è errata!" });
        }

        let token = await createToken(user).then(jwt => jwt);

        return res.status(200).json({token})
    } catch (err) {
        return res.status(500).send({ message: "Errore di autenticazione" })
    }
}

export async function createToken(user: UserModel) {

    const expires = moment().utc().add({ weeks: 1 }).unix();
    const token = {
        exp: expires,
        userId: user._id,
    };

    const encoded = jwt.encode(token, process.env.SECRET_KEY as string);

    return new Promise(function(resolve, reject){
        resolve(`JWT ${encoded}`);
    });
}