import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { BlogService } from '../services/blog.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ShareButtons } from '@ngx-share/core';

@Component({
  selector: 'aqueduct-blog-post',
  templateUrl: './individual-blog.component.html',
  styleUrls: ['./individual-blog.component.scss'],
})

export class IndividualBlogComponent implements OnInit {
  public localState = { value: '' };
  public subscribeForm: FormGroup;
  public shareUrl: any;

  constructor(
    public appState: AppState,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private toastrService: ToastrService,
    public share: ShareButtons,
  ) { this.buildForms(); }

  ngOnInit() {
    // this.submitState('blog');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  buildForms() {
    this.subscribeForm = this.formBuilder.group({
      emailAddress: [null, Validators.required]
    });
  }

  subscribeToBlog() {
    this.blogService.subscribeToBlog(this.subscribeForm.value).subscribe(
      data => {
        console.log('Submission successful. Data is: ' + JSON.stringify(data));
        this.displaySuccessNotification("Thanks for subscribing!");
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
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }

  displayErrorNotification(errorMessage) {
    this.toastrService.error('', errorMessage, {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-full-width',
      tapToDismiss: true
    });
  }

  navigateToIndividualBlogPost() {
    this.router.navigate(['/blog/blog-post']);
  }
}
