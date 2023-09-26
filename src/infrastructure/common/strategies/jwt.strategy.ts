import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('LoginUseCases')
        private readonly loginUsecases: LoginUseCases,
        private readonly logger: LoggerService,
        private readonly exceptionService: ExceptionsService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = this.loginUsecases.validateUserForJWTStragtegy(payload.username);
        if (!user) {
            this.logger.warn('JwtStrategy', `User not found`);
            this.exceptionService.UnauthorizedException({ message: 'User not found' });
        }
        return user;
    }
}
