import { InputType, Field } from '@nestjs/graphql';
import { CreateFrageInput } from './create-frage.input.js';

@InputType()
export class CreateFragebogenInput {
    @Field()
    titel: string;

    @Field({ defaultValue: true })
    aktiv?: boolean;

    @Field(() => [CreateFrageInput])
    fragen: CreateFrageInput[];
}
