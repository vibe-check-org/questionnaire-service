import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './model/entity/entities.js';
import { KafkaModule } from '../messaging/kafka.module.js';
import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { QueryResolver } from './resolver/query.resolver.js';
import { MutationResolver } from './resolver/mutation.resolver.js';
import { ReadService } from './service/read.service.js';
import { WriteService } from './service/write.service.js';

@Module({
    imports: [
        forwardRef(() => KafkaModule),
        TypeOrmModule.forFeature(entities),
        KeycloakModule,
    ],
    // Provider sind z.B. Service-Klassen fuer DI
    providers: [QueryResolver, MutationResolver, ReadService, WriteService],
    // Export der Provider fuer DI in anderen Modulen
    exports: [ReadService, WriteService],
})
export class QuestionnaireModule {}
