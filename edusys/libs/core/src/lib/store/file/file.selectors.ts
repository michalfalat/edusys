import { createFeatureSelector } from '@ngrx/store';
import IFileState from './file.reducer';

const featureSelector = createFeatureSelector<IFileState>('file');
