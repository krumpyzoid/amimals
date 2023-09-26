import { TodoM } from '../../domain/models/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

export class GetTodoUseCases {
    constructor(private readonly todoRepository: TodoRepository) {}

    async byId(id: number): Promise<TodoM> {
        return await this.todoRepository.findById(id);
    }

    async all(): Promise<TodoM[]> {
        return await this.todoRepository.findAll();
    }
}
