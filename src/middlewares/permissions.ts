import { Permission } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { verify } from '@services/jwt.service';

export default (...permissions: Permission[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.header('authorization')

        if (!token) {
            return res.status(401).send({
                message: 'Token not provided'
            })
        }

        try {
            let payload = verify(token)
            res.locals.payload = payload

            let missing = permissions
                            .filter( permission => !payload.permissions.includes(permission) )

            if (missing.length == 0) {
                next()
            }
            else {
                res.status(403).send({
                     message: 'Access denied. Required permissions ' + missing
                })
            }
        }
        catch(err) {
            return res.status(401).send({ 
                message: 'invalid token'
            })
        }
    }
}

