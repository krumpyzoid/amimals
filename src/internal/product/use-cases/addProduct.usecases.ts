import { ILogger } from '../../../modules/logger/logger.interface';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/productRepository.interface';

export class addProductUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(content: string): Promise<ProductM> {
        const product = new Product();
        product.content = content;
        product.isDone = false;
        const result = await this.productRepository.insert(product);
        this.logger.log('addProductUseCases execute', 'New product have been inserted');
        return result;
    }
}
