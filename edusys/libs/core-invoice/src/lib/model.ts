import { IAddress, IAmount } from '@edusys/model';

export interface IInvoiceCore {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  variableSymbol: string;
  constantSymbol: string;
  issueDate: Date;
  dueDate: Date;
  paymentType: InvoicePaymentType;
  logoUrl?: string;
  supplier: IInvoiceSupplier;
  customer: IInvoiceCustomer;
  status: InvoiceStatus;
  discount?: IAmount;
  VAT?: IAmount;
  totalWithoutVAT?: IAmount;
  totalWithVAT?: IAmount;
  note?: string;
  createdBy?: string;
  createdOn?: Date;
  items: IInvoiceItem[];
  currency: string;
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
}

export interface IInvoiceItem {
  name: string;
  description?: string;
  unitPrice: IAmount;
  quantity: number;
  measurementUnit: InvoiceMeasurementUnit;
  priceWithoutVAT?: IAmount;
  VAT: number;
  priceWithVAT?: IAmount;
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

export enum InvoicePaymentType {
  BANK_TRANSFER = 'BANK_TRANSFER',
}
