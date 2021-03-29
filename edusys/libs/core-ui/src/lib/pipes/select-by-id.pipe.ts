import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectById' })
export class SelectByIdPipe implements PipeTransform {
  transform(allData: any[], selectedData?: any[], attribute?: string): string[] {
    if (!allData) return;
    const filtered = allData.filter((all) => selectedData?.map((s) => s.id)?.includes(all?.id));
    if (!!filtered) {
      return filtered?.map((f) => f[attribute]);
    }
    return [];
  }
}
