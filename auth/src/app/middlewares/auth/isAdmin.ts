import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../../errors/not-authorized-error'

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user.role == 'admin'){
        next()
    }
    else{
        // res.status(403).json({
        //     ok: false,
        //     msg: 'User does not have admin privilege'
        // })
        throw new NotAuthorizedError()
    }
}

export default isAdmin