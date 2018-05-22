import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ConsultationService } from '../services/consultation.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'aqueduct-consultation-form',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})

export class ConsultationComponent {
  public consultationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private consultationService: ConsultationService,
    public ngxSmartModalService: NgxSmartModalService ) {
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
        this.ngxSmartModalService.close('consultationModal');
      },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    );
  }
}