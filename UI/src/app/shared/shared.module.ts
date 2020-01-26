import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightStatusDirective } from './directives/highlight-status.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByStringPipe } from './pipes/filter-by-string.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ShowValidationMessageDirective } from './directives/show-validation-message.directive';
import { ShareFormSubmitEventDirective } from './directives/share-form-submit-event.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';

@NgModule({
  declarations: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    DatepickerComponent,
    HighlightStatusDirective,
    DurationPipe,
    OrderByPipe,
    FilterByStringPipe,
    DurationInputComponent,
    NotFoundComponent,
    SpinnerComponent,
    ShowValidationMessageDirective,
    ShareFormSubmitEventDirective,
    ControlErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  entryComponents: [ControlErrorComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    DatepickerComponent,
    DurationInputComponent,
    FontAwesomeModule,
    HighlightStatusDirective,
    ShowValidationMessageDirective,
    ShareFormSubmitEventDirective,
    DurationPipe,
    OrderByPipe,
    FilterByStringPipe,
    NotFoundComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
