import { Module } from '@nestjs/common';
import { ExceptionsModule } from '../../exceptions/exceptions.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { DatabaseUserRepository } from '../../repositories/user.repository';
import { JwtTokenService } from '../../adapters/jwt/jwt.service';
import { BcryptService } from '../../adapters/bcrypt/bcrypt.service';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { JwtModule } from 'src/infrastructure/adapters/jwt/jwt.module';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { BcryptModule } from 'src/infrastructure/adapters/bcrypt/bcrypt.module';

@Module({
    imports: [LoggerModule, ExceptionsModule, RepositoriesModule, JwtModule, EnvironmentConfigModule, BcryptModule],
    exports: ['IsAuthenticatedUseCases', 'LoginUseCases', 'LogoutUseCases'],
    providers: [
        {
            provide: 'IsAuthenticatedUseCases',
            useFactory: (adminUserRepo: DatabaseUserRepository) => new IsAuthenticatedUseCases(adminUserRepo),
            inject: [DatabaseUserRepository],
        },
        {
            provide: 'LoginUseCases',
            useFactory: (
                logger: LoggerService,
                jwtTokenService: JwtTokenService,
                config: EnvironmentConfigService,
                userRepo: DatabaseUserRepository,
                bcryptService: BcryptService,
            ) => new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService),
            inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
        },
        {
            provide: 'LogoutUseCases',
            useFactory: () => new LogoutUseCases(),
            inject: [],
        },
    ],
})
export class AuthModule {}
