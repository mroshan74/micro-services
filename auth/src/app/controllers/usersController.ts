import { Request, Response } from 'express';
import User from '../models/user'
import { InternalServerError } from '../errors/internal-server-error';

class userControllers{
    static getCurrentUser = async(req :Request,res :Response) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            res.json({
                ok: true,
                user
            })
        }
        catch(err){
            throw new InternalServerError('Server Unreachable')
        }
    }
}

export default userControllers