import { Request, Response } from "express";
import { getRepository } from "typeorm";
import api from "../../api/DatastoneAPI";
import User from "../models/User";

export default {

    async show(request: Request, response: Response): Promise<any> {
        const actualQuery: any = request.query;
        const cpf: any = request.query.cpf;

        if(cpf !== undefined) {
            const { data } = await api.searchPersonByCPF(cpf);
            return response.json(data);
        }

        let query = ''
        for (let queryKey in actualQuery) {
             query += `${encodeURIComponent(queryKey)}=${encodeURIComponent(actualQuery[queryKey])}&`
        }
        query = `?${query.slice(0, -1)}`


        const { data } = await api.search(query);

        if(data?.length !== 0) {
            const id = request.params.id;
            const repository = getRepository(User);

            const user = await repository.findOne(id);
            user.credits--;
            await repository.save(user);
        }

        return response.json(data);
    }
}