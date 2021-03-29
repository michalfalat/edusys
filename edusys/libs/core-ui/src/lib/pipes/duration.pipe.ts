import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform = (seconds: number): string => {
    if (!seconds) return null;

    const days = Math.floor(seconds / 86400);
    const duration = new Date((seconds % 86400) * 1000)
      .toUTCString()
      .replace(/.*(\d{2}):(\d{2}):(\d{2}).*/, '$1h $2m $3s');
    return `${days > 0 ? days + 'd ' : ''}${duration}`;
  };
}
