import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import { db } from "@/lib/db";
export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    try {
        const {currentUser} = await serverAuth(req)

        if (req.method === 'POST') {
            const { movieId } = req.body
            
            
             const existingMovie = await db.movie.findUnique({
                 where:{
                     id:movieId
                 }
             })
            if (!existingMovie) {
                return res.status(404).json({error:'Movie not found'})
            }
            const user = await db.user.update({
                where:{
                    id:currentUser?.id
                },
                data:{
                    favoriteIds:{
                            push:movieId
                    }
                }
            })
             return res.status(200).json(user)
         }
        if (req.method ==='DELETE') {
             const { movieId } = req.body
             const existingMovie = await db.movie.findUnique({
                 where:{
                     id:movieId
                 }
             })
            if (!existingMovie) {
                return res.status(404).json({error:'Movie not found'})
            }
            const updatedFavoriteIds = without(currentUser?.favoriteIds,movieId)
            const user = await db.user.update({
                where:{
                    id:currentUser?.id
                },
                data:{
                    favoriteIds:updatedFavoriteIds
                }
            })
             return res.status(200).json(user)
        }
        return res.status(400).json({error:'Internal server error'})

    } catch (error) {
        console.log(error)
        return res.status(400).json({error:'Internal server error'})
    }
        
}