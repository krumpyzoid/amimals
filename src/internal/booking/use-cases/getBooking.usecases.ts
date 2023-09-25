import { BookingM } from '../../domain/model/Booking';
import { BookingRepository } from '../../domain/repositories/BookingRepository.interface';

export class GetBookingUseCases {
  constructor(private readonly BookingRepository: BookingRepository) {}

  async execute(id: number): Promise<BookingM> {
    return await this.BookingRepository.findById(id);
  }
}
