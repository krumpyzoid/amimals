import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from './productRepository.interface';
import { Product } from '../entities/product.interface';

@Injectable()
export class MongooseProductRepository implements ProductRepository {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<Product>,
    ) {}

    async create(createCatDto: CreateProductDto): Promise<Product> {
        const createdCat = new this.productModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        return this.productModel.findOne({ id }).exec();
    }

    async updateContent(id: string, props: Partial<Product>): Promise<Product> {
        return this.productModel.updateOne({ id }, { ...props }, { returnDocument: 'after' });
    }

    async deleteById(id: string): Promise<void> {}
}
