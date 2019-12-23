import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  faSpinner = faSpinner;

  constructor(public loaderService: LoaderService) { }
}
