import { Module } from '@nestjs/common';
import { ExceptionsModule } from '../../exceptions/exceptions.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { AddTodoUseCases } from 'src/usecases/todo/addTodo.usecases';
import { GetTodoUseCases } from 'src/usecases/todo/getTodo.usecases';
import { UpdateTodoUseCases } from 'src/usecases/todo/updateTodo.usecases';
import { DeleteTodoUseCases } from 'src/usecases/todo/deleteTodo.usecases';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
    imports: [LoggerModule, ExceptionsModule, RepositoriesModule],
    exports: [AddTodoUseCases, GetTodoUseCases, UpdateTodoUseCases, DeleteTodoUseCases, LoggerService],
    providers: [AddTodoUseCases, GetTodoUseCases, UpdateTodoUseCases, DeleteTodoUseCases, LoggerService],
})
export class TodoModule {}
