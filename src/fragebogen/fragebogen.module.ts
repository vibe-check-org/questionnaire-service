import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './model/entity/entities.js';
import { KafkaModule } from '../messaging/kafka.module.js';
import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { FragebogenResolver } from './resolver/fragebogen.resolver.js';
import { KategorieResolver } from './resolver/kategorie.resolver.js';
import { FragebogenService } from './service/fragebogen.service.js';
import { KategorieService } from './service/kategorie.service.js';

@Module({
    imports: [
        forwardRef(() => KafkaModule),
        TypeOrmModule.forFeature(entities),
        KeycloakModule,
    ],
    // Provider sind z.B. Service-Klassen fuer DI
    providers: [
        FragebogenResolver,
        KategorieResolver,
        FragebogenService,
        KategorieService,
    ],
    // Export der Provider fuer DI in anderen Modulen
    exports: [FragebogenService, KategorieService],
})
export class QuestionnaireModule {}
