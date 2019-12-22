import { NgModule } from "@angular/core";
import { RouterModule, Routes, ActivatedRoute } from "@angular/router";

import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CourseDataPageComponent } from './components/course-data-page/course-data-page.component';

export function generateCourseBreadcrumb (route: ActivatedRoute) {
  return `Video course ${route.snapshot.params.id}`;
}

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
  },
  {
    path: 'new',
    component: CourseDataPageComponent,
    data: {
      breadcrumb: 'New',
      mode: 'new',
    }
  },
  {
    path: ':id',
    component: CourseDataPageComponent,
    data: {
      mode: 'edit',
      breadcrumb: generateCourseBreadcrumb,
    }
  },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CouresRoutingModule { }
