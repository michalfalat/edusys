import { ICompanyInfo } from '../core/models/company-info.model';

export const companyInfoSeed: ICompanyInfo = {
  name: 'Edusys s.r.o.',
  registeredVAT: false,
  businessId: '123213664',
  registrationNumberVAT: 'SK5464',
  taxId: '1684334163',
  bank: {
    IBAN: 'SK0000354647634',
    bankName: 'mBank',
    SWIFT: 'SKSWIFT',
    currency: 'EUR',
  },
  address: {
    city: 'Zilina',
    country: 'sk',
    name: 'Adresa sidla',
    postalCode: '01001',
    street: 'vlcovska',
    streetNumber: '13',
  },
};
