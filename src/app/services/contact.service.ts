import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ContactInterface, ContactFeedbackInterface } from '../models/contact-form.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api: string = 'https://angular-test.free.beeceptor.com/api/contact-form';

  constructor(private http: HttpClient) { }

  sendContactForm(data: ContactInterface) : Observable<ContactFeedbackInterface> {
    return this.http.post(this.api, data) as  Observable<ContactFeedbackInterface>;
  }

}
