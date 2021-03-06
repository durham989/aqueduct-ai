import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { BlogService } from '../services/blog.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'aqueduct-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})

export class BlogComponent implements OnInit {
  public localState = { value: '' };
  public subscribeForm: FormGroup;
  public blogPosts: any = [];

  constructor(
    public appState: AppState,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private toastrService: ToastrService,
    
  ) { this.buildForms(); }

  ngOnInit() {
    // this.getBlogPosts();
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

  getBlogPosts() {
    this.blogService.getBlogPosts().subscribe(
      data => {
        this.blogPosts = data["data"];
      }, 
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    );
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

  navigateToFirstBlogPost() {
    this.router.navigate(['/blog/technological-solution-for-aging-water-infrastructure']);
  }

  navigateToSecondBlogPost() {
    this.router.navigate(['/blog/farmer-vs-fish-water-crisis-in-california']);
  }
  
  navigateToIndividualBlogPost() {
    this.router.navigate(['/blog/blog-post']);
  }
}
