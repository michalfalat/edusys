import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findCountry' })
export class FindCountryPipe implements PipeTransform {
  transform(countries: any[], code: string): any {
    if (!countries) return;
    return countries.find((c) => c.code === code);
  }
}
