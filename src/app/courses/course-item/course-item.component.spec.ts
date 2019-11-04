import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let onDeleteSpy: jasmine.Spy;
  let onEditSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    onDeleteSpy = spyOn(component, 'onDelete').and.callThrough();
    onEditSpy = spyOn(component, 'onEdit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handler on "Edit" button ', () => {
    const editButton = fixture.debugElement.query(By.css('[data-test-id="EditCourse"'));
    editButton.triggerEventHandler('click', null);

    expect(onEditSpy).toHaveBeenCalled();
  });

  it('should call handler on "Delete" button ', () => {
    const deleteButton = fixture.debugElement.query(By.css('[data-test-id="DeleteCourse"'));
    deleteButton.triggerEventHandler('click', null);

    expect(onDeleteSpy).toHaveBeenCalled();
  });
});
