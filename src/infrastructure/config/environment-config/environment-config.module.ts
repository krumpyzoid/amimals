import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';
import config from './environment-config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            ignoreEnvFile: false,
            isGlobal: true,
            validate,
        }),
    ],
    providers: [EnvironmentConfigService],
    exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
