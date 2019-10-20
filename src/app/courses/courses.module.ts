import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [CoursesListComponent, CourseItemComponent, FilterFormComponent, CoursesPageComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesModule { }
