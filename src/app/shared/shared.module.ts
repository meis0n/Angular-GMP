import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent, HeaderComponent, FooterComponent, InputComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoComponent,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    InputComponent,
    BreadcrumbsComponent,
  ]
})
export class SharedModule { }
