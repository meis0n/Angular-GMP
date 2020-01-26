import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationInputComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DurationInputComponent),
    multi: true,
  }]
})
export class DurationInputComponent {
  value: number;
  error: boolean;

  private propagateChange = (_: any) => { };
  private propagateTouch = () => { };

  public writeValue(value: number) {
    if (value) {
        this.value = value;
    }
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.propagateTouch = fn;
}

  public onChange(event) {
    let newValue = event.target.value;
    this.value = Number(newValue);
    this.error = !Boolean(/\d+/.test(newValue));

    this.propagateChange(this.value);
  }

  public onTouch() {
    this.propagateTouch();
  }

  public validate(c: FormControl) {
    return (!this.error) ? null : {
        dateError: {
            valid: false,
        },
    };
  }
}
