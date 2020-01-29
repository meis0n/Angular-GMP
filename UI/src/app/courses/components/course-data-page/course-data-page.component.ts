import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../entities/course';
import { CourseService } from '../../services/course.service';
import { CourseItem } from '../../entities/course-item';
import { CoursesState } from '../../store/courses.reducer';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { createCourseRequestStarted, updateCourseRequestStarted } from '../../store/courses.actions';
import { Subscription } from 'rxjs';

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

  private getCourseSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private courseServise: CourseService,
    private router: Router,
    private store: Store<CoursesState>
  ) {}

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.data['mode'];

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      this.getCourseSubscription = this.courseServise.getCourseById(id).pipe(
        tap(c => {
          if(!c) {
            this.router.navigateByUrl('404');
          }
          else {
            this.data = c;
          }
        })
      ).subscribe();
    }
  }

  get isEditMode (): boolean {
    return this.mode === 'edit';
  }

  onCancel (): void {
    this.router.navigateByUrl('courses');
  }

  async onSave (): Promise<void> {
    if (this.isEditMode) {
      this.store.dispatch(updateCourseRequestStarted({ payload: this.data }));
    }
    else {
      this.store.dispatch(createCourseRequestStarted({ payload: this.data }));
    }
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.getCourseSubscription) {
      this.getCourseSubscription.unsubscribe();
    }
  }
}
