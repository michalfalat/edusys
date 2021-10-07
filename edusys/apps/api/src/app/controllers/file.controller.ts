import { NextFunction, Request, Response, Router } from 'express';
import * as fileService from './../core/services/file.service';
import * as multer from 'multer';
import * as fs from 'fs';
import { __basedir } from '../../dir';

const detailOfFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailFileResponse = await fileService.detailOfFile(req.params.id);
    res.send(detailFileResponse);
  } catch (err) {
    next(err);
  }
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createFileResponse = await fileService.uploadFile(req.body, req.file);
    res.send(createFileResponse);
  } catch (err) {
    next(err);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // await fileService.deleteFile(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir = `${__basedir}\\uploads\\${req.body.type}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

export const fileRouter = Router();
fileRouter.get('/api/file/:id', detailOfFile);
fileRouter.post('/api/file', multer({ storage: storage }).single('file'), uploadFile);
fileRouter.delete('/api/file/:id', deleteFile);
