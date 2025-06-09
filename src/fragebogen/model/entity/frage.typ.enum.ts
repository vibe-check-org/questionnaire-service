import { registerEnumType } from '@nestjs/graphql';

export const FrageTyp = {
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    FREITEXT: 'FREITEXT',
} as const;

export type FrageTyp = keyof typeof FrageTyp;

// NestJS GraphQL Enum-Registration (manuell)
registerEnumType(
    Object.freeze({
        SINGLE_CHOICE: 'SINGLE_CHOICE',
        MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
        FREITEXT: 'FREITEXT',
    }) as any,
    {
        name: 'FrageTyp',
        description: 'Typ der Frage (Einzelauswahl, Mehrfachauswahl, Freitext)',
    },
);
