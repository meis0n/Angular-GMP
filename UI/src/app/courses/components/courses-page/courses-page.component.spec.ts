import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let onAddCourseSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    onAddCourseSpy = spyOn(component, 'addCourse').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke handler on "Add course" button', () => {
    const editButton = fixture.debugElement.query(By.css('[data-test-id="AddCourse"'));
    editButton.triggerEventHandler('click', null);

    expect(onAddCourseSpy).toHaveBeenCalled();
  });

  it('should renders same quantity items as in data-source', () => {
    const courseItems = fixture.debugElement.queryAll(By.css('app-course-item'));

    expect(courseItems.length).toEqual(component.courses.length);
  });
});
