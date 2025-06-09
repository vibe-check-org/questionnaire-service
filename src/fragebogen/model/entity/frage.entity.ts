import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import type { Fragebogen } from './fragebogen.entity.js';
import { Fragebogen as FragebogenClass } from './fragebogen.entity.js';
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

    @ManyToOne(() => FragebogenClass, (fragebogen) => fragebogen.fragen)
    @JoinColumn({ name: 'fragebogen_id' })
    @Field(() => FragebogenClass)
    fragebogen: Fragebogen;

    @ManyToOne(() => Kategorie, (kategorie) => kategorie.fragen)
    @Field(() => Kategorie)
    kategorie: Kategorie;
}
