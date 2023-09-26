import { CompanyM } from './company';
import { UserWithoutPassword } from './user';
import { AnimalM } from './animal';
import { PaymentM } from './payment';

export class BookingM {
  id: number;
  user: UserWithoutPassword;
  animal: AnimalM;
  company: CompanyM;
  startDate: Date;
  endDate: Date;
  hourStart: string;
  hourEnd: string;
  status: 'PENDING' | 'ONGOING' | 'FINISHED' | 'CANCELED';
  payment: PaymentM;
  createDate: Date;
  updatedDate: Date;
}
