import { BookingM } from '../models/booking';

export interface BookingRepository {
    insert(booking: BookingM): Promise<BookingM>;
    findAll(): Promise<BookingM[]>;
    findById(id: number): Promise<BookingM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
