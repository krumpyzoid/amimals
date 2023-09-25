import { BookingM } from '../../domain/model/Booking';
import { BookingRepository } from '../../domain/repositories/BookingRepository.interface';

export class getBookingsUseCases {
  constructor(private readonly BookingRepository: BookingRepository) {}

  async execute(): Promise<BookingM[]> {
    return await this.BookingRepository.findAll();
  }
}
