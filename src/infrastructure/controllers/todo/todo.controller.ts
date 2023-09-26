import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTodoUseCases } from '../../../usecases/todo/getTodo.usecases';
import { TodoPresenter } from './todo.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UpdateTodoUseCases } from '../../../usecases/todo/updateTodo.usecases';
import { AddTodoDto, UpdateTodoDto } from './todo.dto';
import { DeleteTodoUseCases } from '../../../usecases/todo/deleteTodo.usecases';
import { AddTodoUseCases } from '../../../usecases/todo/addTodo.usecases';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TodoPresenter)
export class TodoController {
    constructor(
        @Inject('GetTodoUseCases')
        private getTodoUsecases: GetTodoUseCases,
        @Inject('UpdateTodoUseCases')
        private updateTodoUsecases: UpdateTodoUseCases,
        @Inject('DeleteTodoUseCases')
        private deleteTodoUsecases: DeleteTodoUseCases,
        @Inject('AddTodoUseCases')
        private addTodoUsecases: AddTodoUseCases,
    ) {}

    @Get('todo')
    @ApiResponseType(TodoPresenter, false)
    async getTodo(@Query('id', ParseIntPipe) id: string) {
        const todo = await this.getTodoUsecases.byId(id);
        return new TodoPresenter(todo);
    }

    @Get('todos')
    @ApiResponseType(TodoPresenter, true)
    async getTodos() {
        const todos = await this.getTodoUsecases.all();
        return todos.map((todo) => new TodoPresenter(todo));
    }

    @Put('todo')
    @ApiResponseType(TodoPresenter, true)
    async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
        const { id, isDone } = updateTodoDto;
        await this.updateTodoUsecases.execute(id, isDone);
        return 'success';
    }

    @Delete('todo')
    @ApiResponseType(TodoPresenter, true)
    async deleteTodo(@Query('id', ParseIntPipe) id: string) {
        await this.deleteTodoUsecases.execute(id);
        return 'success';
    }

    @Post('todo')
    @ApiResponseType(TodoPresenter, true)
    async addTodo(@Body() addTodoDto: AddTodoDto) {
        const { content } = addTodoDto;
        const todoCreated = await this.addTodoUsecases.execute(content);
        return new TodoPresenter(todoCreated);
    }
}
