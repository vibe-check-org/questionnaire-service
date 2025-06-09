import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Frage } from './frage.entity.js';

@Entity()
@ObjectType('Kategorie')
export class Kategorie {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ unique: true })
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    beschreibung?: string;

    @OneToMany(() => Frage, (frage) => frage.kategorie)
    fragen: Frage[];
}
