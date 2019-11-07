import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  public searchValue = '';

  constructor() { }

  ngOnInit() {
  }

  search () {
    console.log(this.searchValue);
  }

}
