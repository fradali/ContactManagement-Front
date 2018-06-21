import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact.modal';
import {ContactService} from '../services/contact/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  myformatDate: string[] = [
    'dd/MM/yyyy'
  ];
  mode = 1;
  contact: Contact = new Contact();

  constructor(public contactService: ContactService) {
  }

  ngOnInit() {
  }

  saveContact() {
    this.contactService.addContact(this.contact).subscribe(data => {
      this.contact = data;
      this.mode = 2;
      console.log(data);
    });
  }

}
