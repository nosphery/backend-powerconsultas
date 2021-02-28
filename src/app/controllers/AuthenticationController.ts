import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../config/config.json";
import User from "../models/User";

export default {

    async authenticate(request: Request, response: Response) {
        const { username, password } = request.body;
        const repository = getRepository(User);

        if(!(username && password)) {
            return response.status(400).send({ error: "The username or password field is missing" });
        }

        const user = await repository.findOne({ username }, {
            select: [
                'password',
                'username',
                'id',
                'credits'
            ]
        });

        if(!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        if(!await bcrypt.compare(password, user.password)) {
            return response.status(401).json({ error: "Incorrect password" }); 
        }

        const token = jwt.sign({ id: user.id }, config.jwt_secret);

        delete user.password;

        return response.json({ user, token })
    }
}