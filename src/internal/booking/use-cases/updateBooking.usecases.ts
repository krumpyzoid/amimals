import { ILogger } from '../../domain/logger/logger.interface';
import { BookingRepository } from '../../domain/repositories/BookingRepository.interface';

export class deleteBookingUseCases {
  constructor(private readonly logger: ILogger, private readonly BookingRepository: BookingRepository) {}

  async execute(id: number): Promise<void> {
    await this.BookingRepository.deleteById(id);
    this.logger.log('deleteBookingUseCases execute', `Booking ${id} have been deleted`);
  }
}
