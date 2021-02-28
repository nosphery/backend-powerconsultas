import { EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent } from "typeorm";
import bcrypt from 'bcryptjs';
import User from "../models/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }
    
    /**
     * Encrypt password
     */
    afterInsert(event: InsertEvent<User>) {
        const user = event.entity;
        const repository = getConnection().getRepository(User);

        bcrypt.hash(user.password, 10, async(err, hash)=> {
            user.password = hash;
            await repository.save(user);
        });
    }
}