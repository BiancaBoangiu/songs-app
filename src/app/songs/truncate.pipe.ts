import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 30): string {
    return value.length <= maxLength
      ? value
      : value.substr(0, maxLength) + '...';
  }
}
