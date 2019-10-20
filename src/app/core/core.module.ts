import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent, HeaderComponent, FooterComponent, InputComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoComponent,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    InputComponent,
  ]
})
export class CoreModule { }
