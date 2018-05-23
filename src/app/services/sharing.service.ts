import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharingService {

  private scrollDestination = new BehaviorSubject<any>('');
  currentScrollDestination = this.scrollDestination.asObservable();

  private modalType = new BehaviorSubject<any>('');
  currentModalType = this.modalType.asObservable();

  constructor() {}

  changeScrollDestination(scrollTarget) {
    this.scrollDestination.next(scrollTarget);
  }

  changeModalType(modalIdentifier) {
    this.modalType.next(modalIdentifier);
  }
}