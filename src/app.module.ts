import { Module } from '@nestjs/common';
import { BookingController } from './internal/booking/booking.controller';
import { AnimalModule } from './internal/animal/animal.module';
import { BookingModule } from './internal/booking/booking.module';
import { PaymentModule } from './internal/payment/payment.module';
import { TokenModule } from './internal/token/token.module';
import { UserModule } from './internal/user/user.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ProductModule } from './internal/product/product.module';
import { ExceptionModule } from './modules/exception/exception.module';
import { LocalStrategy } from './modules/passport/local.strategy';
import { JwtStrategy } from './modules/passport/jwt.strategy';
import { JwtRefreshTokenStrategy } from './modules/passport/jwtRefresh.strategy';

@Module({
    imports: [
        AnimalModule,
        BookingModule,
        PaymentModule,
        TokenModule,
        UserModule,
        LoggerModule,
        ProductModule,
        ExceptionModule,
    ],
    controllers: [BookingController],
    providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
