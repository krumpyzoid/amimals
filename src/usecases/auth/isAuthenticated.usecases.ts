import { UserM, UserWithoutPassword } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { DatabaseUserRepository } from '../../infrastructure/repositories/user.repository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class IsAuthenticatedUseCases {
    constructor(
        @Inject(DatabaseUserRepository)
        private readonly adminUserRepo: UserRepository,
    ) {}

    async execute(username: string): Promise<UserWithoutPassword> {
        const user: UserM = await this.adminUserRepo.getUserByUsername(username);
        const { password, ...info } = user;
        return info;
    }
}
