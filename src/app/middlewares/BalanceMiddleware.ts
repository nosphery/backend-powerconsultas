import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

export default async function handle(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const repository = getRepository(User);
    const user = await repository.findOne(id);

    if(!user) {
        return response.status(404).json({ error: 'User not found'});
    }

    if(user.credits <= 0) {
        return response.status(401).json({ error: 'Insufficient credits'});
    }

    return next();
}