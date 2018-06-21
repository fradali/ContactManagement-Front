import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact.modal';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../services/contact/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  mode = 1;
  contact: Contact = new Contact();
  idContact: number;
  myformatDate: string[] = [
    'dd/MM/yyyy'
  ];

  constructor(public activatedRoute: ActivatedRoute,
              public service: ContactService,
              public  router: Router) {
    this.idContact = activatedRoute.snapshot['id'];
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.params.subscribe(data => {
      this.idContact = data['id'];
      this.service.getContact(this.idContact).subscribe(data => {
        this.contact = data;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  editContact() {
    this.service.updateContact(this.contact).subscribe(data => {
      alert('Update done !');
      this.router.navigate(['contacts']);
    }, error => {
      alert('Update failed !');
    });
  }

}
