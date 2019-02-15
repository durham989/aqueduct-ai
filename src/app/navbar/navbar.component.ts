import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';

import { SharingService } from '../services/sharing.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'aqueduct-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
})
export class NavbarComponent implements OnInit {
  public localState = { value: '' };
  public modalName: any;
  
  constructor(
    public appState: AppState,
    private sharingService: SharingService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router
  ) {}

  public ngOnInit() {
    // console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  scrollToPageSection(destination) {
    this.sharingService.changeScrollDestination(destination);
  }

  openModalType(modalType) {
    this.modalName = modalType;
    this.sharingService.changeModalType(modalType);
  }

  navigateToHomePage(destination) {
    this.router.navigate(['/home']);
    this.scrollToPageSection(destination);
  }

  navigateToOurProcess() {
    this.router.navigate(['/our-process']);
  }

  navigateToBlog() {
    this.router.navigate(['/blog']);
  }
}
