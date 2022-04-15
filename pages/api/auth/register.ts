import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { PrismaClient } from '@prisma/client';
import { encryptPasswordSync } from "../../../utils/crypto";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const payload = req.body;
    //await prisma.$connect();

    try {
        payload.password = encryptPasswordSync(payload.password);
        
        const { db } = await connect();
        const user = await db.collection('users').insertOne(payload);
        //const user = await prisma.user.create({ data: payload });
        
        return res.status(200).json({ message: "Account creato con successo", status: 200 })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Errore di registrazione", status: 500 })
    }

}