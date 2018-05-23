import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WhitepaperService {
  constructor(private http: HttpClient) {}

  sendWhitepaperNotification(whitepaperForm) {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('/whitepaper', whitepaperForm, {headers: apiHeaders});
  }
  
}