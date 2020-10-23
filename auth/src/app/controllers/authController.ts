import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user'
import 'dotenv/config'
import { InternalServerError } from '../errors/internal-server-error';

type TokenData = {
    username: string,
    email: string,
    id: string,
    role: string
};

class authControllers{
    static register = async(req :Request,res :Response) => {
        const { username , email ,password } = req.body
        try {
            let user = User.build({username, email, password})
            await user.save()
            res.json(user)
        }
        catch(err){
            throw new InternalServerError('Server Unreachable')
        }
    }

    static login = async(req :Request,res :Response) => {
        const { email, password } = req.body;
        try{
            const user = await User.findOne({email})
            if(user){
                const match = await bcryptjs.compare(password,user.password)
                if(match){
                    const tokenData: TokenData = {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                        role: user.role
                    }
                    const token = jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn: '1d'})
                    req.session = { jwt: token }
                    res.json({
                        ok: true,
                        token,
                        user: tokenData,
                        msg: 'Login Successful'
                    })
                }
                else{
                    res.json({
                        ok: false,
                        errors:[ {
                            message: 'Invalid email/password'
                        } ]
                    })
                }
            }
            else {
                res.json({
                    ok: false,
                    errors:[ {
                        message: 'Invalid email/password'
                    } ]
                })
            }
        }
        catch(err){
            throw new InternalServerError('Server Unreachable')
        }
    }

    static logout = async(req :Request,res :Response) => {
        req.session = null
        res.json({
            ok: true
        })
    }
}

export default authControllers