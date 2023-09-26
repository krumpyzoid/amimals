import { BookingM } from './booking';
import { PaymentM } from './payment';
import { ServiceM } from './service';

export class TokenM {
  id: number;
  service: ServiceM;
  quantity: number;
  usedFor: BookingM[];
  payment: PaymentM;
  status: 'AVAILABLE' | 'USED';
  createDate: Date;
  updatedDate: Date;
}
