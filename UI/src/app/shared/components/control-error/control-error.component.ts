import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  template: `<p class="validation-message" [class.hide]="_hide">{{_text}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.scss']
 })
 export class ControlErrorComponent {
  _text: string;
  _hide = true;

  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

 }
