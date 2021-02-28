import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';

interface IMySQLConfig {

    host: string;
    port: number;
    username: string;
    password: string;
    database: string;

}

export default class MySQL {

    private dbConfig: any; 
    
    constructor(private readonly config: IMySQLConfig) {
        this.dbConfig = {
            type: "mysql",
            host: this.config.host,
            port: this.config.port,
            username: this.config.username,
            password: this.config.password,
            database: this.config.database,
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [
                path.join(__dirname, "../app/models/*.ts")
            ],
            migrations: [
                path.join(__dirname, "../app/migrations/*.ts")
            ],
            subscribers: [
                path.join(__dirname, "../app/subscribers/*.ts")
            ],
            cli: {
                entitiesDir: path.join(__dirname, "../app/models/"),
                migrationsDir: path.join(__dirname, "../app/migrations/"),
                subscribersDir: path.join(__dirname, "../app/subscribers/")
            }
        }
    }

    public async start(): Promise<Connection> {
        return await createConnection(this.dbConfig).then((connection)=> {
            console.log('Connection with MySQL started.')
            return connection;
        }).catch((error)=> {
            throw Error(`Connection with MySQL failed. Error: ${error}`)
        })
    }
}
