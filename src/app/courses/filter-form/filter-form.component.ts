import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  public searchValue = '';
  @Output() search = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSearch () {
    this.search.emit(this.searchValue);
  }
}
