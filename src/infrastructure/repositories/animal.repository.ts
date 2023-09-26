import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalM } from '../../domain/models/animal';
import { AnimalRepository } from '../../domain/repositories/animalRepository.interface';
import { Animal } from '../schemas/animal.schema';

@Injectable()
export class DatabaseAnimalRepository implements AnimalRepository {
    constructor(
        @InjectModel('Animal')
        private readonly animalEntityRepository: Model<Animal>,
    ) {}

    async updateContent(id: number, isDone: boolean): Promise<void> {
        await this.animalEntityRepository.findByIdAndUpdate(
            {
                id: id,
            },
            { is_done: isDone },
        );
    }
    async insert(animal: AnimalM): Promise<AnimalM> {
        const animalEntity = this.toAnimalEntity(animal);
        const result = await this.animalEntityRepository.create(animalEntity);
        return this.toAnimal(result as Animal);
    }
    async findAll(): Promise<AnimalM[]> {
        const animalsEntity = await this.animalEntityRepository.find();
        return animalsEntity.map((animalEntity) => this.toAnimal(animalEntity));
    }
    async findById(id: number): Promise<AnimalM> {
        const animalEntity = await this.animalEntityRepository.findById(id);
        return this.toAnimal(animalEntity);
    }
    async deleteById(id: number): Promise<void> {
        await this.animalEntityRepository.deleteOne({ id: id });
    }

    private toAnimal(animalEntity: Animal): AnimalM {
        const animal: AnimalM = new AnimalM();

        return animal;
    }

    private toAnimalEntity(animal: AnimalM): Animal {
        const animalEntity: Animal = new Animal();

        return animalEntity;
    }
}
