import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent {
  @Input() value: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
}
