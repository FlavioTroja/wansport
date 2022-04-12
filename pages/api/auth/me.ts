import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { JwtToken } from "../../../models/jwt-model";
import httpErrors from "http-errors";
import jwt from "jwt-simple";

const ObjectId = require('mongodb').ObjectId;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = req.headers.authorization as string;
        let { db } = await connect();
        const user = await db.collection('users').findOne({ _id: ObjectId((await decodeToken(token)).userId) });
        
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: 'Errore nella restituzione della GET' })
    }
}

export async function decodeToken(token: string): Promise<JwtToken> {
    if (!token) {
        throw new httpErrors.BadRequest("Empty token!");
    }

    const split = token.split(" ");

    if (split.length !== 2) {
        throw new httpErrors.BadRequest("Invalid encoded token!");
    }

    return jwt.decode(split[1], process.env.SECRET_KEY as string);
}