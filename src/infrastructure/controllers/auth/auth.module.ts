import { Module } from '@nestjs/common';
import { ExceptionsModule } from '../../exceptions/exceptions.module';
import { LoggerModule } from '../../logger/logger.module';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { JwtModule } from 'src/infrastructure/adapters/jwt/jwt.module';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { BcryptModule } from 'src/infrastructure/adapters/bcrypt/bcrypt.module';

@Module({
    imports: [LoggerModule, ExceptionsModule, RepositoriesModule, JwtModule, EnvironmentConfigModule, BcryptModule],
    exports: [IsAuthenticatedUseCases, LoginUseCases, LogoutUseCases],
    providers: [IsAuthenticatedUseCases, LoginUseCases, LogoutUseCases],
})
export class AuthModule {}
