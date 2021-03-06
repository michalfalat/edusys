import { IAddress, IAmount, IOrganizationResponse } from '@edusys/model';

export interface IInvoice {
  id: string;
  invoiceNumber: string;
  variableSymbol: string;
  constantSymbol: string;
  logoUrl?: string;
  supplier: IInvoiceSupplier;
  customer: IInvoiceCustomer;
  organization: IOrganizationResponse;
  status: InvoiceStatus;
  invoiceHistory?: IInvoice[];
  subTotal: IAmount;
  discount?: IAmount;
  VATRate: number;
  VAT?: IAmount;
  totalWithoutVAT: IAmount;
  totalWithVAT: IAmount;
  note?: string;
  createdBy?: string;
  items: IInvoiceItem[];
}

export interface IInvoiceSupplier {
  name: string;
  address?: IAddress;
  contactEmail?: string;
  contactPhone?: string;
  businessId: string;
  taxId?: string;
  registeredVAT: boolean;
  registrationNumberVAT?: string;
  IBAN?: string;
  SWIFT?: string;
  bankName?: string;
}

export interface IInvoiceCustomer {
  name: string;
  address?: IAddress;
  contactEmail?: string;
  contactPhone?: string;
  businessId: string;
  taxId?: string;
  registeredVAT: boolean;
  registrationNumberVAT?: string;
  IBAN?: string;
  SWIFT?: string;
  bankName?: string;
}

export interface IInvoiceItem {
  name: string;
  description?: string;
  unitPrice: IAmount;
  quantity: number;
  measurementUnit: InvoiceMeasurementUnit;
  priceWithoutVAT: IAmount;
  VAT: number;
}

export enum InvoiceMeasurementUnit {
  QUANTITY = 'QUANTITY',
  HOUR = 'HOUR',
}

export enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  OLD_VERSION = 'OLD_VERSION',
  CANCELED = 'CANCELED',
}
