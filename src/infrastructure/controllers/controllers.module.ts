import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TodoController } from './todo/todo.controller';

@Module({
    imports: [TodoModule, AuthModule],
    controllers: [TodoController, AuthController],
})
export class ControllersModule {}
