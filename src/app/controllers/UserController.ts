import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import config from '../../config/config.json';
import User from "../models/User";

export default {

    async store(request: Request, response: Response) {
        const { username, password } = request.body;
        const repository = getRepository(User);

        if(!(username && password)) {
            return response.status(400).json({ error: 'username or password is missing.' });
        }

        const existUser = await repository.findOne({ username });
        if(existUser) {
            return response.status(409).json({ error: 'username already exist'});
        }

        const user = await repository.save({
            username,
            password
        });

        delete user.password;

        const token = jwt.sign({ id: user.id }, config.jwt_secret);
        return response.json({ user, token });
    }
}