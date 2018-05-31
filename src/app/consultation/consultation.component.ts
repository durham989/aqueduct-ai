import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ConsultationService } from '../services/consultation.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'aqueduct-consultation-form',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})

export class ConsultationComponent {
  public consultationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private consultationService: ConsultationService,
    public ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService) {
    this.buildConsultationForm();
  }

  ngOnInit() {
    //
  }

  buildConsultationForm() {
    this.consultationForm = this.formBuilder.group({
      consultFirstName: [null, [Validators.required, Validators.nullValidator]],
      consultLastName: [null, [Validators.required, Validators.nullValidator]],
      consultEmailAddress: [null, [Validators.required, Validators.nullValidator]],
      consultOrgName: [null, [Validators.required, Validators.nullValidator]]
    });
  }

  submitConsultationForm() {
    // TODO: configure database and send submitted details to database and Aqueduct email
    this.consultationService.sendConsultationNotification(this.consultationForm.value).subscribe(
      data => {
        console.log('Submission successful. Data is: ' + JSON.stringify(data));
        this.displaySuccessNotification("We'll email you soon to schedule your consultation!");
        this.ngxSmartModalService.close('consultationModal');
      },
      error => {
        console.error(error);
        this.displayErrorNotification("Looks like something went wrong. Try again or reach out to us at info@aqueduct.ai");
        this.ngxSmartModalService.close('consultationModal');
        return Observable.throw(error);
      }
    );
  }

  displaySuccessNotification(successMessage) {
    this.toastrService.success('', successMessage, {
      timeOut: 8000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }

  displayErrorNotification(errorMessage) {
    this.toastrService.error('', errorMessage, {
      timeOut: 8000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }
}