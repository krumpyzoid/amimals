import { Product } from '../entities/product.interface';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    updateContent(id: string, props: Partial<Product>): Promise<Product>;
    deleteById(id: string): Promise<void>;
}
