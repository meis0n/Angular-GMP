import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginModule } from './login/login.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Home',
    },
    canActivate: [ AuthGuardService ],
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses'
      },
      {
        path: 'courses',
        data: {
          breadcrumb: 'Courses',
        },
        loadChildren: "./courses/courses.module#CoursesModule"
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: '404',
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
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
