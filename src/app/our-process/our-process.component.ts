import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import anime from 'animejs';
import * as THREE from 'three';
import { TweenMax, Back } from "gsap/TweenMax";

@Component({
  selector: 'aqueduct-our-process',
  templateUrl: './our-process.component.html',
  styleUrls: ['./our-process.component.scss'],
})

export class OurProcessComponent implements OnInit {
  public localState = { value: '' };
  public processStep: any = 1;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.animateStepImages();
  }

  animateStepImages() {
    var pathEls = document.querySelectorAll('path');
    for (var i = 0; i < pathEls.length; i++) {
      var pathEl = pathEls[i];
      var offset = JSON.stringify(anime.setDashoffset(pathEl));
      pathEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: anime.random(1000, 3000),
        delay: anime.random(0, 2000),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true
      });
    }
  }

  showStep(step) {
    this.processStep = step;
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }




}
