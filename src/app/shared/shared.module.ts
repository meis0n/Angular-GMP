import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightStatusDirective } from './directives/highlight-status.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByStringPipe } from './pipes/filter-by-string.pipe';

@NgModule({
  declarations: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    HighlightStatusDirective,
    DurationPipe,
    OrderByPipe,
    FilterByStringPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    FontAwesomeModule,
    HighlightStatusDirective,
    DurationPipe,
    OrderByPipe,
    FilterByStringPipe
  ]
})
export class SharedModule { }
