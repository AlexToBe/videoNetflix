import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if (req.method !='GET') {
        return res.status(405).end()
    }
    try {
        await serverAuth(req)
        const movieCount = await db.movie.count()
        const randomIndex = Math.floor(Math.random() * movieCount)
        const randomMovies = await db.movie.findMany({
            take:1,
            skip:randomIndex    
        })
        return res.status(200).json(randomMovies[0])
    } catch (error) {
        console.log(error)
        return res.status(400).end()

    }

}