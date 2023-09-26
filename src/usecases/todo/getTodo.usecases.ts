import { Inject, Injectable } from '@nestjs/common';

import { TodoM } from '../../domain/models/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { DatabaseTodoRepository } from 'src/infrastructure/repositories/todo.repository';

@Injectable()
export class GetTodoUseCases {
    constructor(
        @Inject(DatabaseTodoRepository)
        private readonly todoRepository: TodoRepository,
    ) {}

    async byId(id: string): Promise<TodoM> {
        return await this.todoRepository.findById(id);
    }

    async all(): Promise<TodoM[]> {
        return await this.todoRepository.findAll();
    }
}
