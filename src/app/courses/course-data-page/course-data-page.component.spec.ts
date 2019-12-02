import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDataPageComponent } from './course-data-page.component';

describe('CourseDataPageComponent', () => {
  let component: CourseDataPageComponent;
  let fixture: ComponentFixture<CourseDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
