import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  public searchValue = '';
  @Output() search = new EventEmitter<string>();

  onSearch (): void {
    this.search.emit(this.searchValue);
  }
}
