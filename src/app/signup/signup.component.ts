import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert/alert.service';
import {UserService} from '../services/user/user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User = new User();
  role: string[] = ['ROLE_ADMIN', 'ROLE_CLIENT'];

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public alertService: AlertService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.registerForm);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.user = this.registerForm.value;
    this.user.roles = [this.role[1]];
    console.log('user: ' + this.user);
    this.loading = true;
    this.userService.create(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/signup']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
