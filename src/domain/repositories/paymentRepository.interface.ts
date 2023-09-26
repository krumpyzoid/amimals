import { PaymentM } from '../models/payment';

export interface PaymentRepository {
    insert(payment: PaymentM): Promise<PaymentM>;
    findAll(): Promise<PaymentM[]>;
    findById(id: number): Promise<PaymentM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
