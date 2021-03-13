import { __assetsdir, __basedir } from 'apps/api/src/dir';
import { createTestInvoice, testInvoice as mockInvoice } from '@edusys/core-invoice';
import InvoiceModel from '../models/invoice.model';
import { BadRequest, NotFound } from '../utils/errors';
import { getCurrentUser } from '../middlewares/current-http-context';
import OrganizationModel from '../models/organization.model';
import UserModel from '../models/user.model';

export const testInvoice = async (): Promise<string> => {
  return createTestInvoice(__assetsdir, __assetsdir);
};

// LIST OF ALL INVOICES WITHOUT PAGINATION
// export const listOfInvoices = async (): Promise<IInvoiceDetailResponse[]> => {
//   const listOfEntities = await InvoiceModel.find();
//   if (!listOfEntities) {
//     throw new NotFound();
//   }
//   return invoiceListMapper(listOfEntities);
// };

// // DETAIL OF INVOICE
// export const detailOfInvoice = async (id: string): Promise<IInvoiceDetailResponse> => {
//   const detailModel = await InvoiceModel.findById(id);
//   if (!detailModel) {
//     throw new NotFound();
//   }
//   return invoiceDetailMapper(detailModel);
// };

// CREATE NEW INVOICE
export const createInvoice = async (): Promise<any> => {
  // const { error } = createInvoiceSchemaValidate(payload);
  // if (!!error) {
  //   throw new BadRequest(error.details[0].message);
  // }

  const newModel = new InvoiceModel({
    editable: true,
    organization: await OrganizationModel.findOne(),
    createdBy: getCurrentUser() || (await UserModel.findOne()),
    editedBy: getCurrentUser() || (await UserModel.findOne()),
    invoice: mockInvoice(__assetsdir),
  });
  try {
    const savedModel = await newModel.save();
    return savedModel;
  } catch (error) {
    throw new BadRequest(error);
  }
};

// // EDIT INVOICE
// export const editInvoice = async (payload: IInvoiceEditRequest): Promise<IInvoiceDetailResponse> => {
//   const { error } = editInvoiceSchemaValidate(payload);
//   if (!!error) {
//     throw new BadRequest(error.details[0].message);
//   }
//   try {
//     const id = payload.id;
//     const updatedModel = await InvoiceModel.findByIdAndUpdate(id, payload, { new: true });
//     return invoiceDetailMapper(updatedModel);
//   } catch (error) {
//     throw new BadRequest(error);
//   }
// };

// DELETE INVOICE
export const deleteInvoice = async (id: string): Promise<void> => {
  try {
    await InvoiceModel.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
