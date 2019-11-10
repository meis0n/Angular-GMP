import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {

  @Input('appHighlightStatus') date: Date;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) { }

  ngOnChanges() {
    const now = moment();
    const date = moment(this.date);
    const difference = moment.duration(now.diff(date));

    if ( date > now) {
      this.renderer.addClass(this.hostElement.nativeElement, 'planned');
    } else if (difference < moment.duration(14, 'days')) {
      this.renderer.addClass(this.hostElement.nativeElement, 'active');
    }
  }
}
