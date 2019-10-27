import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faCalendarAlt, faClock, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  faPencilAlt: IconDefinition = faPencilAlt;
  faTrash: IconDefinition = faTrash;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faClock: IconDefinition = faClock;

  constructor() { }

  ngOnInit() {
  }

}
