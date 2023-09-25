import { ILogger } from '../../domain/logger/logger.interface';
import { BookingM } from '../../domain/model/booking';
import { BookingRepository } from '../../domain/repositories/BookingRepository.interface';

export class addBookingUseCases {
  constructor(private readonly logger: ILogger, private readonly BookingRepository: BookingRepository) {}

  async execute(content: string): Promise<BookingM> {
    const Booking = new BookingM();
    Booking.content = content;
    Booking.isDone = false;
    const result = await this.BookingRepository.insert(Booking);
    this.logger.log('addBookingUseCases execute', 'New Booking have been inserted');
    return result;
  }
}
