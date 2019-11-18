import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe<T> implements PipeTransform {
  transform (items: Array<T>, propName: string): Array<T> {
    return items.sort((a, b) => {
      if (a[propName] > b[propName]) {
        return 1;
      }
      if (a[propName] < b[propName]) {
        return -1;
      }
      return 0;
    });
  }
}
