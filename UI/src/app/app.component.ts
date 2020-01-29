import { Component, OnInit } from '@angular/core';
import { RootState } from './store';
import { Store } from '@ngrx/store';
import { getUserData } from './store/root.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ANGULAR-GMP';

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUserData());
  }
}
