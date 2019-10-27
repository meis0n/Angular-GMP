import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy } from '@angular/core';
import { faPencilAlt, faCalendarAlt, faClock, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent
implements OnInit,OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() data: Course;
  @Output() changed = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<string>();

  faPencilAlt: IconDefinition = faPencilAlt;
  faTrash: IconDefinition = faTrash;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faClock: IconDefinition = faClock;

  constructor() { }

  ngOnChanges()	{
    console.log('ngOnChanges');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  // ngDoCheck() {
  //   console.log('ngOnInit');
  // }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  onEdit() {
    this.changed.emit(this.data);
  }

  onDelete() {
    this.deleted.emit(this.data.id);
  }
}
