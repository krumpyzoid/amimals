export class CompanyM {
  id: number;
  owner: string;
  name: string;
  addresses: CompanyAddressM[];
  address: CompanyAddressM;
  phones: CompanyPhoneM[];
  phone: CompanyPhoneM;
  emails: CompanyEmailM[];
  email: CompanyEmailM;
  createDate: Date;
  updatedDate: Date;
}

export class CompanyAddressM {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export class CompanyPhoneM {
  id: string;
  name: string;
  phone: string;
}

export class CompanyEmailM {
  id: string;
  name: string;
  email: string;
}
