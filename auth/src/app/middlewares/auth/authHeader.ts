import { Request, Response, NextFunction } from "express"

import User from '../../models/user'
import jwt from 'jsonwebtoken'
// require('dotenv').config()
import 'dotenv/config'
import { BadRequestError } from "../../errors/bad-request-error"

interface UserPayload {
    id: string,
    role: string,
    username: string,
    email: string
}


declare global {
    namespace Express{
        interface Request {
            user: UserPayload
        }
    }
}

const authenticateUser = async(req: Request,res: Response,next: NextFunction) => {
    if(req.header('x-auth')){
        const token = <string>req.header('x-auth') 
        console.log(token)
        let tokenData: {
            id?: string
        }
        try{
            tokenData = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
            console.log(tokenData)
            const user = await User.findById(tokenData.id)
            if(user){
                req.user = user
                next()
            }else{
                return res.status(500).json({
                    ok: false,
                    errors: [{
                        message: 'Internal Error - User not found'
                    }]
                })
            }
        } catch(err) {
            throw new BadRequestError('Invalid Token')
        }
    }else {
        throw new BadRequestError('User token missing')
    }
}

export default authenticateUser