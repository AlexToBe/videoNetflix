import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if (req.method !='GET') {
        return res.status(405).end()
    }

    try {
        await serverAuth(req)
        const { movieId } = req.query
        if (typeof movieId !== 'string') throw new Error('Invalid Id') 
        if (!movieId) {
            throw new Error('Invalid movie Id')
        }
        const movie = await db.movie.findUnique({
            where:{id:movieId}
        })

        if (!movie) {
            throw new Error('Invalid movie Id')
        }
        return res.status(200).json(movie)

    } catch (error) {
        console.log(error)
        return res.status(400).json({error:'Internal server error'})
    }
        
}