import { Injectable } from '@nestjs/common';

import { ILogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

@Injectable()
export class UpdateTodoUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(id: string, isDone: boolean): Promise<void> {
        await this.todoRepository.updateContent(id, isDone);
        this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
    }
}
