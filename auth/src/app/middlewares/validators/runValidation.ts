import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../../errors/request-validation-error'

export const runValidation = (req: Request,res: Response,next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // return res.status(400).json({
        //     ok: false,
        //     msg: errors.array()[0].msg
        // })
        throw new RequestValidationError(errors.array())
    }
    next()
}