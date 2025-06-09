import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Frage } from './frage.entity.js';

@Entity()
@ObjectType()
export class Fragebogen {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    titel: string;

    @Column({ default: true })
    @Field()
    aktiv: boolean;

    @OneToMany(() => Frage, (frage) => frage.fragebogen, { cascade: true })
    @Field(() => [Frage])
    fragen: Frage[];

    @CreateDateColumn()
    @Field()
    erstelltAm: Date;

    @UpdateDateColumn()
    @Field()
    aktualisiertAm: Date;
}
