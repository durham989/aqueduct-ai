import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { BlogService } from '../services/blog.service';
import { ConsultationService } from '../services/consultation.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

declare var particlesJS: any;

@Component({
  selector: 'aqueduct-wastewater-facility-landing-page',
  templateUrl: './wastewater-facility.component.html',
  styleUrls: ['./wastewater-facility.component.scss'],
})

export class WastewaterFacilityComponent implements OnInit {
  public localState = { value: '' };
  public wastewaterFacilityForm: FormGroup;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private toastrService: ToastrService,
    private consultationService: ConsultationService,
    
  ) { this.buildForms(); }

  ngOnInit() {
    particlesJS.load('particles-js-5', '../../assets/particlesjs-config.json', null);
  }

  buildForms() {
    this.wastewaterFacilityForm = this.formBuilder.group({
      name: [null, Validators.required],
      organizationName: [null, Validators.required],
      businessGoal: ['Save Money', Validators.required],
      emailAddress: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      landingPageName: ['Water Utility', Validators.required],
    });
  }

  scheduleConsultation() {
    console.log('water utility form values: ' + JSON.stringify(this.wastewaterFacilityForm.value));
    this.consultationService.scheduleConsultationWastewaterLandingPage(this.wastewaterFacilityForm.value).subscribe(
      data => {
        console.log('Consultation submitted. Data is: ' + JSON.stringify(data));
        this.displaySuccessNotification('Thanks for scheduling a consultation! We will reach out to you shortly!');
      },
      error => {
        console.error(error);
        this.displayErrorNotification(error.message);
        return Observable.throw(error);
      }
    );
  }

  displaySuccessNotification(successMessage) {
    this.toastrService.success('', successMessage, {
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }

  displayErrorNotification(errorMessage) {
    this.toastrService.error('', errorMessage, {
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }
}
