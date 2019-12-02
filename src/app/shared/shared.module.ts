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
import { FormsModule } from '@angular/forms';
import { DurationInputComponent } from './components/duration-input/duration-input.component';

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
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    DatepickerComponent,
    DurationInputComponent,
    FontAwesomeModule,
    HighlightStatusDirective,
    DurationPipe,
    OrderByPipe,
    FilterByStringPipe
  ]
})
export class SharedModule { }
