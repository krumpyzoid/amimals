import { TodoM } from '../models/todo';

export interface TodoRepository {
    insert(todo: TodoM): Promise<TodoM>;
    findAll(): Promise<TodoM[]>;
    findById(id: string): Promise<TodoM>;
    updateContent(id: string, isDone: boolean): Promise<void>;
    deleteById(id: string): Promise<void>;
}
