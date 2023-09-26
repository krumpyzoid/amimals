import { LoggerService } from '../../infrastructure/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { Inject } from '@nestjs/common';
import { DatabaseTodoRepository } from 'src/infrastructure/repositories/todo.repository';
import { TodoM } from '../../domain/models/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

@Injectable()
export class AddTodoUseCases {
    constructor(
        @Inject(LoggerService)
        private readonly logger: ILogger,
        @Inject(DatabaseTodoRepository)
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(content: string): Promise<TodoM> {
        const todo = new TodoM();
        todo.content = content;
        todo.isDone = false;
        const result = await this.todoRepository.insert(todo);
        this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
        return result;
    }
}
