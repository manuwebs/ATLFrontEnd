import { HttpClient } from '@angular/common/http';
import { IContact } from '../contact.model';
import { HttpService } from '../../../shared/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends HttpService<IContact> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, 'Contacts');
  }
}
