import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop()
    id: string;

    @Prop()
    content: string;

    @Prop()
    is_done: boolean;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
