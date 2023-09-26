import { ServiceM } from '../models/service';

export interface ServiceRepository {
    insert(service: ServiceM): Promise<ServiceM>;
    findAll(): Promise<ServiceM[]>;
    findById(id: number): Promise<ServiceM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
