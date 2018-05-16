import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(private scrollToService: ScrollToService) {}

  public triggerScrollTo(destination) {
    const config: ScrollToConfigOptions = {
      target: destination
    };

    this.scrollToService.scrollTo(config);
  } 
}