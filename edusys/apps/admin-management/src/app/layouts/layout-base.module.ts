import { CommonContainer } from '@edusys/core';

export class LayoutBaseContainer extends CommonContainer {
  onSuccess: (message?: string) => void;
  onError: (message?: string) => void;
}
