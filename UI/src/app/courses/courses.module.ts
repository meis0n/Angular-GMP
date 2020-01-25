import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CourseDataPageComponent } from './components/course-data-page/course-data-page.component';
import { SharedModule } from '../shared/shared.module';
import { CouresRoutingModule } from './courses-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCourses from './store/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effect';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    CourseDataPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CouresRoutingModule,
    StoreModule.forFeature(fromCourses.coursesFeatureKey, fromCourses.reducers),
    EffectsModule.forFeature([CoursesEffects])
  ],
})
export class CoursesModule { }
