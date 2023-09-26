import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Todo.name, schema: TodoSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    providers: [DatabaseTodoRepository, DatabaseUserRepository],
    exports: [DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
