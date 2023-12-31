import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtTokenService } from 'src/infrastructure/adapters/jwt/jwt.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { BcryptService } from 'src/infrastructure/adapters/bcrypt/bcrypt.service';

@Injectable()
export class LoginUseCases {
    constructor(
        @Inject(LoggerService)
        private readonly logger: ILogger,
        @Inject(JwtTokenService)
        private readonly jwtTokenService: IJwtService,
        @Inject(EnvironmentConfigService)
        private readonly jwtConfig: JWTConfig,
        @Inject(DatabaseUserRepository)
        private readonly userRepository: UserRepository,
        @Inject(BcryptService)
        private readonly bcryptService: IBcryptService,
    ) {}

    async getCookieWithJwtToken(username: string) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload: IJwtServicePayload = { username: username };
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    }

    async getCookieWithJwtRefreshToken(username: string) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload: IJwtServicePayload = { username: username };
        const secret = this.jwtConfig.getJwtRefreshSecret();
        const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        await this.setCurrentRefreshToken(token, username);
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
        return cookie;
    }

    async validateUserForLocalStragtegy(username: string, pass: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.compare(pass, user.password);
        if (user && match) {
            await this.updateLoginTime(user.username);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserForJWTStragtegy(username: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        return user;
    }

    async updateLoginTime(username: string) {
        await this.userRepository.updateLastLogin(username);
    }

    async setCurrentRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
        await this.userRepository.updateRefreshToken(username, currentHashedRefreshToken);
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }

        const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }

        return null;
    }
}
