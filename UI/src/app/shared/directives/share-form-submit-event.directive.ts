import { Directive, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Directive({
 selector: 'form'
})
export class ShareFormSubmitEventDirective {
 submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1))

 constructor(private host: ElementRef<HTMLFormElement>) { }

 get element() {
   return this.host.nativeElement;
 }
}
