import { NextFunction, Request, Response, Router } from 'express';
import * as invoiceService from './../core/services/invoice.service';

// TEST INVOICE
export const testInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = await invoiceService.testInvoice();
    res.send({ status: 'OK', url });
  } catch (err) {
    next(err);
  }
};

// CREATE INVOICE
export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createInvoiceResponse = await invoiceService.createInvoice();
    res.send(createInvoiceResponse);
  } catch (err) {
    next(err);
  }
};

export const invoiceRouter = Router();
invoiceRouter.post('/api/invoice/test-invoice', testInvoice);
invoiceRouter.post('/api/invoice', createInvoice);
