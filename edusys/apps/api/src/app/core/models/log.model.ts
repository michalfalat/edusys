import { Schema, model, Document, SchemaTypes, PaginateModel } from 'mongoose';
import { IEntity } from './entity.model';
import * as paginate from 'mongoose-paginate-v2';

export interface ILog extends IEntity {
  timestamp: string;
  level: string;
  message: string;
  meta?: any;
}

export interface ILogDocument extends ILog, Document {}

const logSchema = new Schema<ILogDocument>(
  {
    timestamp: SchemaTypes.Date,
    level: String,
    message: String,
    meta: SchemaTypes.Mixed,
  },
  {}
);
logSchema.plugin(paginate);

type LogModel<T extends Document> = PaginateModel<T>;

const LogModel: LogModel<ILogDocument> = model<ILogDocument>('log', logSchema) as LogModel<ILogDocument>;
export default LogModel;
