import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { WhitepaperService } from '../services/whitepaper.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'aqueduct-whitepaper-form',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.scss']
})

export class WhitepaperComponent {
  public whitepaperForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private whitepaperService: WhitepaperService,
    public ngxSmartModalService: NgxSmartModalService,
    public toastrService: ToastrService) {
    this.buildWhitepaperForm();
  }

  ngOnInit() {
    //
  }

  buildWhitepaperForm() {
    this.whitepaperForm = this.formBuilder.group({
      whitepaperFullName: [null, [Validators.required, Validators.nullValidator]],
      whitepaperEmailAddress: [null, [Validators.required, Validators.nullValidator]]
    });
  }

  submitWhitepaperForm() {
    this.whitepaperService.sendWhitepaperNotification(this.whitepaperForm.value).subscribe(
      data => {
        console.log('Submission successful. Data is: ' + JSON.stringify(data));
        this.displaySuccessNotification("Check your email for your copy of our whitepaper!");
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
    this.toastrService.success('', errorMessage, {
      timeOut: 8000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }
}