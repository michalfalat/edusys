import { IFileUploadRequest, IFileDetailResponse } from '@edusys/model';
import FileModel from '../models/file.model';
import { fileDetailMapper } from '../mappers/file.mapper';
import { BadRequest, NotFound } from '../utils/errors';
import { getCurrentUser } from '../middlewares/current-http-context';
import * as fs from 'fs';
import * as path from 'path';
import { logInfo } from '../utils/logger';

export const detailOfFile = async (id: string): Promise<IFileDetailResponse> => {
  const detailModel = await FileModel.findById(id);
  if (!detailModel || detailModel.obsolete) {
    throw new NotFound();
  }
  return fileDetailMapper(detailModel, process.env.APP_URL);
};

export const uploadFile = async (payload: IFileUploadRequest, file: Express.Multer.File): Promise<IFileDetailResponse> => {
  // const { error } = uploadFileSchemaValidate(payload);
  // if (!!error) {
  //   throw new BadRequest(error.details[0].message);
  // }

  const newModel = new FileModel({
    name: file.originalname,
    url: file.path,
    createdBy: getCurrentUser()?.id,
    mimeType: file.mimetype,
    type: payload.type,
  });
  try {
    let savedModel = await newModel.save();
    const filename = path.parse(savedModel.url);
    const tmpPath = savedModel.url.replace(filename.base, `${savedModel._id}${filename.ext}`);
    fs.renameSync(savedModel.url, tmpPath);
    const newUrl = `uploads\\${savedModel.type}\\${savedModel._id}${filename.ext}`;
    savedModel.url = newUrl;
    savedModel = await savedModel.save();

    logInfo(`[FILE_SERVICE] file '${file.originalname}' uploaded`);
    return fileDetailMapper(savedModel, process.env.APP_URL);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE File
export const deleteFile = async (id: string): Promise<void> => {
  try {
    await FileModel.findByIdAndDelete(id);
    logInfo(`[FILE_SERVICE] file '${id}' was deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
