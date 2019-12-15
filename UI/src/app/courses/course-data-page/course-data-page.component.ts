import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { CourseItem } from '../course-item';

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
  public data: Course = new CourseItem();

  private mode: string;

  constructor(
    private route: ActivatedRoute,
    private courseServise: CourseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.data['mode'];

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      const data = await this.courseServise.getCourseById(id).subscribe(c => {
        if(!data) {
          this.router.navigateByUrl('404');
        }
        else {
          this.data = c;
        }
      });
    }
  }

  get isEditMode (): boolean {
    return this.mode === 'edit';
  }

  onCancel (): void {
    this.router.navigateByUrl('courses');
  }

  async onSave (): Promise<void> {
    // TODO: Изменить при выполнении task9
    if (this.isEditMode) {
      return;
    }
    else {
      this.courseServise.createCourse(this.data).subscribe(() => {
        this.router.navigateByUrl('courses');
      });
    }

  }
}
