import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Contact} from '../../models/contact.modal';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  token: string;
  options: any;


  constructor(public http: HttpClient) {
  }

  getContacts(keyword: String, page: number, size: number): any {
    return this.http.get('http://localhost:8090/searchContacts?keywords=' + keyword + '&size=' + size + '&page=' + page
      , {headers: this.getHeaders()})
      .pipe(
        map(resp => resp));
  }

  addContact(contact: Contact): any {
    return this.http.post('http://localhost:8090/contacts', contact)
      .pipe(
        map(resp => resp));
  }

  getContact(id: number): any {
    return this.http.get('http://localhost:8090/contacts/' + id)
      .pipe(
        map(resp => resp));
  }

  getAllContacts() {
    return this.http.get('http://localhost:8090/contacts')
      .pipe(
        map(resp => resp));
  }

  updateContact(contact: Contact): any {
    return this.http.put('http://localhost:8090/contacts/' + contact.id, contact)
      .pipe(
        map(resp => resp));
  }

  deleteContact(id: number): any {
    return this.http.delete('http://localhost:8090/contacts/' + id)
      .pipe(
        map(resp => resp));
  }

  getHeaders(): any {
    const headers = new Headers();
    this.token = localStorage.getItem('token');
    console.log('Auth Service token: ' + this.token);
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', this.token);
    return headers;
  }
}
