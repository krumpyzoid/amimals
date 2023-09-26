import { Injectable, Inject } from '@nestjs/common';
import { DatabaseTodoRepository } from 'src/infrastructure/repositories/todo.repository';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

@Injectable()
export class DeleteTodoUseCases {
    constructor(
        @Inject(LoggerService)
        private readonly logger: ILogger,
        @Inject(DatabaseTodoRepository)
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(id: string): Promise<void> {
        await this.todoRepository.deleteById(id);
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
