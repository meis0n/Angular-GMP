import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'filterByString'})
export class FilterByStringPipe<T> implements PipeTransform {
  transform(items: Array<T>, propName: string, value: string): Array<T> {

    return items.filter((a) => a[propName].search(value) !== -1);
  }
}
