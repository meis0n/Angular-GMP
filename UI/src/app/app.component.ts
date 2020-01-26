import { Component } from '@angular/core';
import { RootState } from './store';
import { Store } from '@ngrx/store';
import { getUserData } from './store/root.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ANGULAR-GMP';

  /**
   *
   */
  constructor(private store: Store<RootState>) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.dispatch(getUserData());
  }
}
