import { Component, OnInit, Input, forwardRef, ElementRef, HostListener } from '@angular/core';
import { Author } from '../../entities/author';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsSelectComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AuthorsSelectComponent),
    multi: true,
  }]
})
export class AuthorsSelectComponent implements ControlValueAccessor {

  @Input() options: Author[];

  faTrash: IconDefinition = faTrash;

  value: Author[] = [];
  textFragment: string;
  error: boolean;

  wasInside: boolean;

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.hideSuggestions()
    }
    this.wasInside = false;
  }


  public isSuggestionsOpened = false;

  private propagateChange = (_: any) => { };
  private propagateTouch = () => { };

  public writeValue(value: Author[]) {
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

  public selectAuthor = (data: Author) => {
    this.value = [...this.value, data];
    this.propagateChange(this.value);
  }

  public deleteSelectedAuthor = (data: Author) =>{
    this.value = this.value.filter(x => x.id !== data.id);
    this.propagateChange(this.value);
  }

  public validate(c: FormControl) {
    return (!this.error) ? null : {
        dateError: {
            valid: false,
        },
    };
  }

  showSuggestions () {
    this.isSuggestionsOpened = true;
    this.propagateTouch();
  }
  hideSuggestions () {
    this.isSuggestionsOpened = false;
  }
}
