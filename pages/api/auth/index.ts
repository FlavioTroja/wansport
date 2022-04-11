import { NextApiRequest, NextApiResponse } from "next";
import { login, register } from "./authentication";

const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
   console.log(req.method);
   
   switch (req.method) {
        case 'GET': {
            return login(req, res);
        }

        case 'POST': {
            return register(req, res);
        }
    }
}