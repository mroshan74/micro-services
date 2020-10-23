import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors/bad-request-error';

interface UserPayload {
    id: string,
    role: string,
    username: string,
    email: string
}

export const authCookie = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        throw new BadRequestError('User not signed in')
    }
    try {
        const user = jwt.verify( req.session.jwt, process.env.JWT_SECRET! ) as UserPayload;
        req.user = user;
    } catch (err) {
        throw new BadRequestError('Invalid Token or expired')
    }
    next();
};
