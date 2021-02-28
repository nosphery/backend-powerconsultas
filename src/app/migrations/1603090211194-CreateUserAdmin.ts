import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcryptjs'
import config from '../../config/config.json';
import User from "../models/User";

export class CreateUserAdmin1603090211194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = new User();
        user.username = "admin";
        user.password = await bcrypt.hash(config.default_admin_password, 10);
        user.credits = 9999;

        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
