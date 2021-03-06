import { __assetsdir, __basedir } from 'apps/api/src/dir';
import { createTestInvoice } from '@edusys/core-invoice';

export const testInvoice = async (): Promise<string> => {
  return createTestInvoice(__assetsdir, __assetsdir);
};
