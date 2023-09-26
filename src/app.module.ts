import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { BcryptModule } from './infrastructure/adapters/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/adapters/jwt/jwt.module';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/common/strategies/jwtRefresh.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './infrastructure/controllers/auth/auth.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';

@Module({
    imports: [
        EnvironmentConfigModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.secret,
        }),
        LoggerModule,
        ExceptionsModule,
        ControllersModule,
        BcryptModule,
        JwtServiceModule,
        MongooseModule.forRoot('mongodb://localhost/nest'),
        AuthModule,
    ],
    providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
