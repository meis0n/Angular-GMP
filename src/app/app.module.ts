import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './courses/courses.module';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginModule } from './login/login.module';
import { CourseDataPageComponent } from './courses/course-data-page/course-data-page.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'course',
    component: CourseDataPageComponent,
  },
  {
    path: '**',
    component: CoursesPageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    SharedModule,
    CoursesModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
