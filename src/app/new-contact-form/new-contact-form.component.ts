import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact/contact.service';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.css']
})
export class NewContactFormComponent implements OnInit {

  constructor(public contactsService: ContactService) {
  }

  ngOnInit() {
  }

  onSaveContact(dataForm) {
    this.contactsService.addContact(dataForm)
      .subscribe(data => {
        console.log('Daijobu');
        }, err => {
          console.log(err);
        }
      );

  }


}
