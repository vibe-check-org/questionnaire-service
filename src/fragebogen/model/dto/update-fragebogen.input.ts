import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateFragebogenInput {
    @Field({ nullable: true })
    titel?: string;

    @Field({ nullable: true })
    aktiv?: boolean;
}
