import axios from "axios";
import cacheService from "../services/CacheService";
import config from "../config/config.json";

const cache = new cacheService();

const api = axios.create({
    baseURL: config.datastone_api_url,
    headers: {
        authorization: config.authorization
    }
});

export default {

    async search(query: string): Promise<any> {
        const { data }: any = await api.get(`persons/search${query}`);
        if(data?.length === 0) {
            return { data:[] }
        };

        return data;
    },

    async searchPersonByCPF(cpf: string): Promise<any> {
        const person = cache.get(cpf);

        return person ? person : cache.put(cpf, await api.get(`persons/?cpf=${cpf}&plan=${config.datastone_plan}`));
    }
} 