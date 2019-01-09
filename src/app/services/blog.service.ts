import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient) {}

  subscribeToBlog(subscribeForm) {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('/subscribe', subscribeForm, {headers: apiHeaders});
  }

  getBlogPosts() {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('/blog/all', {headers: apiHeaders});
  }

  getIndividualBlogPost(postId) {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('/blog' + postId, {headers: apiHeaders});
  }
  
}