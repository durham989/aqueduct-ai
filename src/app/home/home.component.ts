import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { SharingService } from '../services/sharing.service';
import { ScrollService } from '../services/scroll.service';

declare var particlesJS: any;

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Title,
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0deg)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  public localState = { value: '' };
  public stepOneFlipped: Boolean = false;
  public stepTwoFlipped: Boolean = false;
  public stepThreeFlipped: Boolean = false;
  public flip: string = 'inactive';
  public modalName: any;
  public scrollDestination: any;
  public emittedModalName: any;
  public flipped: Boolean = false;
  public statFlipped: Boolean = false;

  constructor(
    public appState: AppState,
    public title: Title,
    public ngxSmartModalService: NgxSmartModalService,
    private sharingService: SharingService,
    private scrollService: ScrollService
  ) { }

  public ngOnInit() {
    console.log('hello `Home` component');
    
    // Subscribe to navbar scroll destinations
    this.sharingService.currentScrollDestination.subscribe(
      scrollDestination => {
        this.scrollDestination = scrollDestination;
        this.scrollService.triggerScrollTo(this.scrollDestination);
      }
    );

    particlesJS.load('particles-js', '../../assets/particlesjs-config.json', null);
    particlesJS.load('particles-js-2', '../../assets/particlesjs-config.json', null);
    particlesJS.load('particles-js-3', '../../assets/particlesjs-config.json', null);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  flipFirstStep() {
    this.stepOneFlipped = !this.stepOneFlipped;
    // this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  flipSecondStep() {
    this.stepTwoFlipped = !this.stepTwoFlipped;
  }

  flipThirdStep() {
    this.stepThreeFlipped = !this.stepThreeFlipped;
  }

  flipImage() {
    this.flipped = !this.flipped;
  }

  flipStat() {
    this.statFlipped = !this.statFlipped;
  }

  openModalType(modalType) {
    this.modalName = modalType;
    // this.ngxSmartModalService.open(modalType);
    this.ngxSmartModalService.open('consultationModal');
  }
}
