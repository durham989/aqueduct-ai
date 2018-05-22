import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConsultationService {
  constructor(private http: HttpClient) {}

  sendConsultationNotification(consultationForm) {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('/consultation', consultationForm, {headers: apiHeaders});
  }
  
}