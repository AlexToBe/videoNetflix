import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if (req.method !='GET') {
        return res.status(405).end()
    }

    try {
        await serverAuth(req)
          const movies = await db.movie.findMany({
              
          })
        return res.status(200).json(movies)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:'Internal server error'})
    }
        
}