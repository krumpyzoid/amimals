import { AnimalM } from '../models/animal';

export interface AnimalRepository {
    insert(animal: AnimalM): Promise<AnimalM>;
    findAll(): Promise<AnimalM[]>;
    findById(id: number): Promise<AnimalM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
