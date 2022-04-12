import { UserModel } from './../../../models/user';
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { comparePasswords } from '../../../utils/crypto';
import jwt from "jwt-simple";
import moment from "moment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const payload: UserModel = req.body;
    
    try {
        let { db } = await connect();
        const user: Promise<UserModel> | any = await db.collection('users').insertOne(payload);

        return res.status(200).json({ message: "Account creato con successo!", user })
    } catch (err) {
        return res.status(500).send({ message: "Errore di registrazione!" })
    }

}