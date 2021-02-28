import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

export default {

    async setCredits(request: Request, response: Response) {
        const id = request.params.id;
        const {user_id, credits } = request.body;

        const repository = getRepository(User);
        const admin = await repository.findOne(id);

        if(admin.id !== 1) return response.status(401).json({ error: 'Admin required'});

        const user = await repository.findOne(user_id);
        if(!user) return response.status(404).json({ error: 'User not found '});

        user.credits = credits;
        const saved = await repository.save(user);
        return response.json(saved);
    }
}