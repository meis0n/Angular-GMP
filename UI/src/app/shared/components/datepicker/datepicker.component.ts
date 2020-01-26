import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true,
  }]
})
export class DatepickerComponent implements ControlValueAccessor, Validator {
  value = '';
  error: boolean;

  private propagateChange = (_: any) => { };
  private propagateTouch = () => { };

  public writeValue(value: string) {
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

  public onTouch() {
    this.propagateTouch();
  }

  public onChange(event) {
    let newValue = event.target.value;
    this.value = newValue;

    const match = newValue.match(/\d{2}\/\d{2}\/\d{4}/);
    this.error = !(match && newValue === match[0]);

    this.propagateChange(this.value);
  }

  public validate(c: FormControl) {
    return (!this.error) ? null : {
        dateError: {
            valid: false,
        },
    };
  }
}
