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
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'course/new',
    component: CourseDataPageComponent,
    data: {
      //Вопрос: в идеале я зотел бы видеть это чем-то вроде константы
      // COURSE_DETAIL_MODES.EDIT|NEW, но как правильно их заимпортить в коммон модуль из своего модуля, отвечающего за страницы курсов?
      mode: 'new',
    }
  },
  {
    path: 'course/:id',
    component: CourseDataPageComponent,
    data: {
      mode: 'edit',
    }
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch : 'full'
  },
  {
    path: '404',
    component: NotFoundComponent,
    pathMatch : 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
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
