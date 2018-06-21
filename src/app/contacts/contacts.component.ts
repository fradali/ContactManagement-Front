import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact/contact.service';
import {Router} from '@angular/router';
import {Contact} from '../models/contact.modal';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any;
  keywords = '';
  page = 0;
  size = 5;
  pages: Array<number>;

  constructor(
    public contactService: ContactService,
    public router: Router,
    public  service: ContactService
  ) {
  }


  ngOnInit() {
    this.contactService.getContacts(this.keywords, this.page, this.size)
      .subscribe(data => {
        this.contacts = data;
        this.pages = new Array(data.totalPages);
        console.log(this.pages);
        console.log(data);
        console.log('totalPages' + data.totalPages);
      }, error => {
        console.log(error);
      });
  }


  doSearch() {
    this.contactService.getContacts(this.keywords, this.page, this.size)
      .subscribe(data => {
        this.contacts = data;
        this.pages = new Array(data.totalPages);
        console.log(this.pages);
        console.log(data);
        console.log('totalPages' + data.totalPages);
      }, error => {
        console.log(error);
      });
  }

  searchContact() {
    this.doSearch();
  }

  goToPage(i: number) {
    this.page = i;
    this.doSearch();
  }

  onEditContact(id: number) {
    this.router.navigate(['/editContact', id]);
  }

  onDeleteContact(contact: Contact) {
    const confirm = window.confirm('Are you sure?');
    if (confirm === true) {
      this.service.deleteContact(contact.id)
        .subscribe(data => {
          this.contacts.content.splice(this.contacts.content.indexOf(contact), 1);
        }, err => {
          console.log(err);
        });

    }
  }
}
