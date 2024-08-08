import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { db } from "./db";

const serverAuth = async (req:NextApiRequest)=>{
    const session = await getSession({ req })
    if (!session?.user?.email) {
        throw new Error('Please sign in to access this resource')
    }
    const currentUser = await db.user.findUnique({
        where:{email:session.user.email }
    })  
    if (!currentUser) {
        throw new Error('User not found')
    }

    return {currentUser}
}

export default serverAuth