import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { faPencilAlt, faCalendarAlt, faClock, faTrash, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input() data: Course;
  @Output() changed = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<string>();

  faPencilAlt: IconDefinition = faPencilAlt;
  faTrash: IconDefinition = faTrash;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faClock: IconDefinition = faClock;
  faStar: IconDefinition = faStar;

  onEdit (): void {
    this.changed.emit(this.data);
  }

  onDelete (): void {
    const id = this.data && this.data.id;
    if (id) {
      this.deleted.emit(id);
    }
  }
}
