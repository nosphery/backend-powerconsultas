import { NextFunction, Request, Response } from "express";
import config from "../../config/config.json"
import jwt from 'jsonwebtoken';

export default async function handle(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization;

    if(!authorization) {
        return response.status(401).send({ error: 'No token provided' })
    }

    const parts = authorization.split(" ");

    if(parts.length !== 2) {
        return response.status(401).send({ error: 'Token malformatted' });
    }

    const [ schema, token ] = parts;

    if(!/^Bearer$/i.test(schema)) {
        return response.status(401).send({ error: 'Token malformatted' });
    }

    return jwt.verify(token, config.jwt_secret, (error, decoded: any)=> {
        if(error) return response.status(401).send({ error: 'Invalid token' })
        request.params.id = decoded.id;
        return next();
    });
} 