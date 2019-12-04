import { Component } from '@angular/core';

@Component({
  selector: 'app-course-data-page',
  templateUrl: './course-data-page.component.html',
  styleUrls: ['./course-data-page.component.scss']
})
export class CourseDataPageComponent {
  public title: string;
  public description: string;
  public date: string;
  public duration: number;
}
