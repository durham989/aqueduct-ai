import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'aqueduct-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
})
export class NavbarComponent implements OnInit {
  public localState = { value: '' };
  
  constructor(
    public appState: AppState,
  ) {}

  public ngOnInit() {
    // console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
