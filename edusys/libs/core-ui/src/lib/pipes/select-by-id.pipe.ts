import { Pipe, PipeTransform } from '@angular/core';
import isArray from 'lodash-es/isArray';

@Pipe({ name: 'selectById' })
export class SelectByIdPipe implements PipeTransform {
  transform(allData: any[], selectedData?: any | any[], attribute?: string | string[]): string | string[] {
    if (!allData) return;
    if (isArray(selectedData)) {
      const filtered = allData.filter((all) => selectedData?.map((s) => s.id)?.includes(all?.id));
      if (filtered) {
        if (isArray(attribute)) {
          return filtered?.map((f) => f[attribute[0]] || f[attribute[1]]);
        } else {
          return filtered?.map((f) => f[attribute]);
        }
      }
      return [];
    } else {
      const filtered = allData.find((all) => all?.id === selectedData?.id);
      if (filtered) {
        if (isArray(attribute)) {
          return filtered[attribute[0]] || filtered[attribute[1]];
        } else {
          return filtered[attribute];
        }
      }
      return '';
    }
  }
}
