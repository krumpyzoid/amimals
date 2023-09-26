import { TokenM } from '../models/tokens';

export interface TokensRepository {
    insert(tokens: TokenM): Promise<TokenM>;
    findAll(): Promise<TokenM[]>;
    findById(id: number): Promise<TokenM>;
    updateContent(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
