import { UserModel } from './../../../models/user';
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../utils/dbConnect';
import { PrismaClient, Prisma } from '@prisma/client';
import { encryptPasswordSync } from "../../../utils/crypto";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const payload: UserModel = req.body;
    payload.password = encryptPasswordSync(payload.password);
        
    try {
        await prisma.$connect();
        await prisma.user.create({ data: payload });
        await prisma.$disconnect();
        
        return res.status(200).json({ message: "Account creato con successo", status: 200 })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Errore di registrazione", status: 500 })
    }

}