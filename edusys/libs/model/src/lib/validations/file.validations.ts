import * as Joi from '@hapi/joi';
import { IFileUploadRequest } from '../dto/file.dto';

export const fileSchema = Joi.object<IFileUploadRequest>().keys({
  type: Joi.string().required(),
});

export const uploadFileSchemaValidate = (data: IFileUploadRequest): Joi.ValidationResult => fileSchema.validate(data);
