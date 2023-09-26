import { CompanyM } from '../models/company';

export interface CompanyRepository {
    insert(company: CompanyM): Promise<CompanyM>;
    findAll(): Promise<CompanyM[]>;
    findById(id: number): Promise<CompanyM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
