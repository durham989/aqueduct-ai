import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'aqueduct-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  
  ngOnInit() {
    particlesJS.load('particles-js-4', '../../assets/particlesjs-config.json', null);
  }

}