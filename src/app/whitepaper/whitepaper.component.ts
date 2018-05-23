import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { WhitepaperService } from '../services/whitepaper.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'aqueduct-whitepaper-form',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.scss']
})

export class WhitepaperComponent {
  public whitepaperForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private whitepaperService: WhitepaperService,
    public ngxSmartModalService: NgxSmartModalService ) {
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
        this.ngxSmartModalService.close('consultationModal');
      },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    );
  }
}