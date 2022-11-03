import { NextFunction, Request, Response } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[ERROR] ${req.method} ${req.originalUrl} -> ${error.message}`);
    res.status(500).send({
        message: 'Internal Server Error: ' + error.message
    })
}