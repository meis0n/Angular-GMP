import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [ LogoComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    FontAwesomeModule
  ]
})
export class SharedModule { }
