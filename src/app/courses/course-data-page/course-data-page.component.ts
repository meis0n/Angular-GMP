import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { CourseService } from '../course.service';

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
  public data: Course;

  constructor(
    private route: ActivatedRoute,
    private courseServise: CourseService,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.data = await this.courseServise.getCourseById(id);
  }
}
