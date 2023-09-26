import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoM } from '../../domain/models/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { Todo } from '../schemas/todo.schema';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
    constructor(
        @InjectModel(Todo.name)
        private readonly todoEntityRepository: Model<Todo>,
    ) {}

    async updateContent(id: string, isDone: boolean): Promise<void> {
        await this.todoEntityRepository.findByIdAndUpdate(
            {
                id: id,
            },
            { is_done: isDone },
        );
    }
    async insert(todo: TodoM): Promise<TodoM> {
        const todoEntity = this.toTodoEntity(todo);
        const result = await this.todoEntityRepository.create(todoEntity);
        return this.toTodo(result as Todo);
    }
    async findAll(): Promise<TodoM[]> {
        const todosEntity = await this.todoEntityRepository.find();
        return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
    }
    async findById(id: string): Promise<TodoM> {
        const todoEntity = await this.todoEntityRepository.findById(id);
        return this.toTodo(todoEntity);
    }
    async deleteById(id: string): Promise<void> {
        await this.todoEntityRepository.deleteOne({ id: id });
    }

    private toTodo(todoEntity: Todo): TodoM {
        const todo: TodoM = new TodoM();
        todo.id = todoEntity.id;
        todo.content = todoEntity.content;
        todo.isDone = todoEntity.is_done;
        todo.createdDate = todoEntity.created_at;
        todo.updatedDate = todoEntity.updated_at;
        return todo;
    }

    private toTodoEntity(todo: TodoM): Todo {
        const todoEntity: Todo = new Todo();

        return todoEntity;
    }
}
