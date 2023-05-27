import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    
    // Conferir se o metodo usado vai ser o GET
    if(req.method !== "GET") {
        return res.status(405).end();
    }

    // Não foi preciso conferir se o usuário existe pois foi feito no serverAuth
    try {
        
        const {currentUser} = await serverAuth(req);

        return res.status(200).json(currentUser);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}