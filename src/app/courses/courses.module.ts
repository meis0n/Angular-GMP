import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseItemComponent } from './course-item/course-item.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CourseItemComponent, FilterFormComponent, CoursesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesModule { }
