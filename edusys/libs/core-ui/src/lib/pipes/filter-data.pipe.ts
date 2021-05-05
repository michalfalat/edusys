import { Pipe, PipeTransform } from '@angular/core';
import isArray from 'lodash-es/isArray';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], fieldName: string | string[], searchQuery: string): any {
    if (!items) return;
    if (!searchQuery) return items;

    if (isArray(fieldName)) {
      return items.filter((item) => {
        let result = false;
        fieldName.forEach((key) => {
          if (item[key]?.toLowerCase()?.includes(searchQuery?.toLocaleLowerCase())) {
            result = true;
          }
        });
        return result;
      });
    }

    return items.filter((item) => item[fieldName]?.toLowerCase()?.includes(searchQuery?.toLocaleLowerCase()));
  }
}
