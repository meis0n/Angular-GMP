import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform (minutes: number): string {
    const duration = moment.duration(minutes, 'minutes');

    return minutes >= 60
      ? `${duration.hours()}h ${duration.minutes()}min`
      : `${duration.minutes()}min`;
  }
}
