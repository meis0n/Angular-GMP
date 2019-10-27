import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { SharedModule } from '../shared/shared.module';
import { SearchInputComponent } from './filter-form/search-input/search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CoursesListComponent, CourseItemComponent, FilterFormComponent, CoursesPageComponent, SearchInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesModule { }
