import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn() id: number;
    @Column({ unique: true }) username: string;
    @Column({ select: false }) password: string;
    @Column({ default: 0 }) credits: number = 0;
}