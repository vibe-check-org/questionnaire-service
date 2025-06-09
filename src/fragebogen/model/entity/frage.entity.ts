import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fragebogen } from './fragebogen.entity.js';
import { FrageTyp } from './frage.typ.enum.js';
import { Kategorie } from './kategorie.entity.js';

@Entity()
@ObjectType()
export class Frage {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    text: string;

    @Column()
    @Field(() => String)
    typ: FrageTyp;

    @ManyToOne(() => Fragebogen, (fragebogen) => fragebogen.fragen)
    fragebogen: Frage;

    @ManyToOne(() => Kategorie, (kategorie) => kategorie.fragen)
    @Field(() => Kategorie)
    kategorie: Kategorie;
}
