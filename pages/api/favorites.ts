import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if (req.method != 'GET') {
        return res.status(404).end
    }
    try {
        const { currentUser } = await serverAuth(req)
             const favoriteMovies = await db.movie.findMany({
                 where:{
                     id: {
                         in:currentUser?.favoriteIds
                     }
                 }
             })
       
             return res.status(200).json(favoriteMovies)
        

    } catch (error) {
        console.log(error)
        return res.status(400).json({error:'Internal server error'})
    }
        
}