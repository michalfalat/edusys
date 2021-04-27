import { createFeatureSelector } from '@ngrx/store';
import IFileState from './file.reducer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const featureSelector = createFeatureSelector<IFileState>('file');
