export class ServiceM {
  id: number;
  name: string;
  description: string;
  price: PriceM;
  createDate: Date;
  updatedDate: Date;
}

export class PriceM {
  id: number;
  basePrice: number;
  rules: PriceRule[];
  createDate: Date;
  updatedDate: Date;
}

export class PriceRule {
  id: number;
  name: string;
  min: number;
  max: number;
  price: number;
}
