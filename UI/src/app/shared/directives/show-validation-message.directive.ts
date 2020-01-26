import { Directive, ElementRef, Input, OnChanges, Renderer2, Optional, Host, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import * as moment from 'moment';
import { FormControl, NgControl } from '@angular/forms';
import { ShareFormSubmitEventDirective } from './share-form-submit-event.directive';
import { merge, EMPTY, Observable } from 'rxjs';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ShowValidationMessageDirective {
  submit$: Observable<Event>;
  ref: ComponentRef<ControlErrorComponent>;

  constructor (private controlDir: NgControl,
    @Optional() @Host() private form: ShareFormSubmitEventDirective,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,) {
      this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

  ngOnInit() {
    merge(
      this.submit$,
      this.controlDir.valueChanges,
    ).subscribe(() => {
      const controlErrors = this.controlDir.errors;
      if (controlErrors) {
        const firstKey = Object.values(controlErrors)[0];

        const text = firstKey.message || 'неверно';
        this.setError(text);
      }
      else {
        this.setError(null);
      }
    })
  }

  setError(text: string) {
    // // const button = this.renderer.createElement('button');
    // const buttonText = this.renderer.createText('This is a button');
    // // const comment = this.renderer.createComment('createComment? Comment Created!');
    // // const parent = this.elRef.nativeElement.parentNode;
    // const reference = this.elRef.nativeElement;
    // this.renderer.insertBefore(parent, buttonText, reference)



    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory, -1);
      console.log(this.vcr)
    }

    this.ref.instance.text = text;
  }
}
