import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../entities/course';
import { CourseService } from '../../services/course.service';
import { CourseItem } from '../../entities/course-item';
import { CoursesState } from '../../store/courses.reducer';
import { Store, select } from '@ngrx/store';
import { selectCourseById } from '../../store/courses.selectors';
import { tap } from 'rxjs/operators';
import { createCourseRequestStarted, updateCourseRequestStarted } from '../../store/courses.actions';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../entities/author';

@Component({
  selector: 'app-course-data-page',
  templateUrl: './course-data-page.component.html',
  styleUrls: ['./course-data-page.component.scss']
})
export class CourseDataPageComponent {
  private mode: string;

  private getCourseSubscription: Subscription;

  public form: FormGroup;

  private id: string;

  authors$: Observable<Author[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authorsService: AuthorsService,
    private router: Router,
    private store: Store<CoursesState>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      creationDate: ['', [Validators.required]],
      durationMin: ['', [Validators.required]],
      authors: [[], ({value}) => value.length ? null : { valueError: true }],
    });
  }

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.data['mode'];

    if (this.isEditMode) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getCourseSubscription = this.courseService.getCourseById(this.id).pipe(
        tap(c => {
          if(!c) {
            this.router.navigateByUrl('404');
          }
          else {
            this.form.setValue({
              title:        c.title,
              description:  c.description,
              creationDate: c.creationDate,
              durationMin:  c.durationMin,
              authors:      c.authors
            });
          }
        })
      ).subscribe();
    }

    this.authors$ = this.authorsService.getAuthors();
  }

  get isEditMode (): boolean {
    return this.mode === 'edit';
  }

  onCancel (): void {
    this.router.navigateByUrl('courses');
  }

  async onFormSubmit (): Promise<void> {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }

    const formData =this.form.getRawValue();
    const payload = {
      creationDate: formData.creationDate,
      description: formData.description,
      durationMin: formData.durationMin,
      title: formData.title,
      authors: formData.authors,
      id: this.id
    }
    if (this.isEditMode) {
      this.store.dispatch(updateCourseRequestStarted({ payload }));
    }
    else {
      this.store.dispatch(createCourseRequestStarted({ payload : {
        ...payload,
        topRated: false,
      }}));
    }
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy(): void {
    if(this.getCourseSubscription) {
      this.getCourseSubscription.unsubscribe();
    }
  }
}
