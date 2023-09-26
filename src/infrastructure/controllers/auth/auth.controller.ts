import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';

import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';

import { ApiResponseType } from '../../common/swagger/response.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
    constructor(
        @Inject('LoginUseCases')
        private readonly loginUsecases: LoginUseCases,
        @Inject('LogoutUseCases')
        private readonly logoutUsecases: LogoutUseCases,
        @Inject('IsAuthenticatedUseCases')
        private readonly isAuthUsecases: IsAuthenticatedUseCases,
    ) {}

    @Post('login')
    @UseGuards(LoginGuard)
    @ApiBearerAuth()
    @ApiBody({ type: AuthLoginDto })
    @ApiOperation({ description: 'login' })
    async login(@Body() auth: AuthLoginDto, @Request() request: any) {
        const accessTokenCookie = await this.loginUsecases.getCookieWithJwtToken(auth.username);
        const refreshTokenCookie = await this.loginUsecases.getCookieWithJwtRefreshToken(auth.username);
        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return 'Login successful';
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'logout' })
    async logout(@Request() request: any) {
        const cookie = await this.logoutUsecases.execute();
        request.res.setHeader('Set-Cookie', cookie);
        return 'Logout successful';
    }

    @Get('is_authenticated')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'is_authenticated' })
    @ApiResponseType(IsAuthPresenter, false)
    async isAuthenticated(@Req() request: any) {
        const user = await this.isAuthUsecases.execute(request.user.username);
        const response = new IsAuthPresenter();
        response.username = user.username;
        return response;
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    @ApiBearerAuth()
    async refresh(@Req() request: any) {
        const accessTokenCookie = await this.loginUsecases.getCookieWithJwtToken(request.user.username);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return 'Refresh successful';
    }
}
