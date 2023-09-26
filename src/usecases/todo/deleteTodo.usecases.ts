import { Injectable } from '@nestjs/common';

import { ILogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

@Injectable()
export class DeleteTodoUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(id: string): Promise<void> {
        await this.todoRepository.deleteById(id);
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
