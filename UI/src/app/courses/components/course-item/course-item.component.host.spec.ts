import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Course } from '../entities/course';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-course-item
      [data]="course"
      (changed)="onChange($event)"
      (deleted)="onDelete($event)"
    ></app-course-item>
  `
})
class TestHostCourseItemComponent {
  public course: Course = {
    creationDate: '',
    description: 'Lorem ipsum',
    durationMin: 120,
    id: '1',
    title: 'Test course',
    topRated: false
  };

  public onChange (changedCourse: Course): void {
    console.log(changedCourse);
  }

  public onDelete (deletedCourseId: string): void {
    console.log(deletedCourseId);
  }
}

describe('TestHostCourseItemComponent', () => {
  let component: TestHostCourseItemComponent;
  let fixture: ComponentFixture<TestHostCourseItemComponent>;
  let onDeleteSpy: jasmine.Spy;
  let onChangeSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostCourseItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    onDeleteSpy = spyOn(component, 'onDelete').and.callThrough();
    onChangeSpy = spyOn(component, 'onChange').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call parent`s handler on "Edit" button ', () => {
    const editButton = fixture.debugElement.query(By.css('[data-test-id="EditCourse"'));
    editButton.triggerEventHandler('click', null);

    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith(component.course);
  });

  it('should call parent`s handler on "Delete" button ', () => {
    const deleteButton = fixture.debugElement.query(By.css('[data-test-id="DeleteCourse"'));
    deleteButton.triggerEventHandler('click', null);

    expect(onDeleteSpy).toHaveBeenCalled();
    expect(onDeleteSpy).toHaveBeenCalledWith(component.course.id);
  });

  it('should renders passed title', () => {
    const titleContainer = fixture.debugElement.query(By.css('[data-test-id="CourseTitle"')).nativeElement;

    expect(titleContainer.textContent.trim()).toEqual(component.course.title);
  });

  it('should renders passed description', () => {
    const descriptionContainer = fixture.debugElement.query(By.css('[data-test-id="CourseDescription"')).nativeElement;

    expect(descriptionContainer.textContent.trim()).toEqual(component.course.description);
  });
});
