import { BookingM } from './booking';
import { TokenM } from './tokens';

export class PaymentM {
  id: number;
  status: 'PENDING' | 'PAID' | 'CANCELED';
  paymentStrategy: 'TOKEN' | 'DIRECT';
  booking?: BookingM;
  token?: TokenM;
  amount: string;
  paymentIntents: PaymentIntentM[];
  createDate: Date;
  updatedDate: Date;
}

export class PaymentIntentM {
  paymentIntentId: string;
  clientSecret: string;
  amount: string;
  description: string;
  createDate: Date;
}
