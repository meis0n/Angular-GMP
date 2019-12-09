import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './courses/courses.module';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginModule } from './login/login.module';
import { CourseDataPageComponent } from './courses/course-data-page/course-data-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Home',
    },
    children:[{
      path: 'login',
      component: LoginPageComponent
    },
    {
      path: 'courses',
      canActivate: [AuthGuardService],
      data: {
        breadcrumb: 'Courses',
      },
      children: [
        {
          path: '',
          component: CoursesPageComponent,
        },
        {
          path: 'new',
          component: CourseDataPageComponent,
          data: {
            breadcrumb: 'New',
            //Вопрос: в идеале я зотел бы видеть это чем-то вроде константы
            // COURSE_DETAIL_MODES.EDIT|NEW, но как правильно их заимпортить в коммон модуль из своего модуля, отвечающего за страницы курсов?
            mode: 'new',
          }
        },
        {
          path: ':id',
          component: CourseDataPageComponent,
          data: {
            mode: 'edit',
            breadcrumb: (route: ActivatedRoute) => `Video course ${route.snapshot.params.id}`
          }
        },
      ]
    },
    {
      path: '',
      redirectTo: 'courses',
      pathMatch: 'full'
    },
    {
      path: '404',
      component: NotFoundComponent,
      pathMatch: 'full'
    }],
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
      { enableTracing: false }
    ),
    SharedModule,
    CoursesModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
