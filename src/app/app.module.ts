import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactsComponent} from './contacts/contacts.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HttpClientModule} from '@angular/common/http';
import {ContactService} from './services/contact/contact.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule, DropdownModule} from 'primeng/primeng';
import {NewContactComponent} from './new-contact/new-contact.component';
import {NewContactFormComponent} from './new-contact-form/new-contact-form.component';
import {EditContactComponent} from './edit-contact/edit-contact.component';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AlertService} from './services/alert/alert.service';
import {AuthenticationService} from './services/auth/authentication-service';
import {UserService} from './services/user/user.service';


const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'newContact', component: NewContactComponent},
  {path: 'editContact/:id', component: EditContactComponent},
  {path: '', redirectTo: '/signin', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent,
    NewContactComponent,
    NewContactFormComponent,
    EditContactComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ContactService, AlertService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
