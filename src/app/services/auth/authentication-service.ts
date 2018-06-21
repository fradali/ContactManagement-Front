import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8090/signin?username=' + username + '&password=' + password,
      {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user + ' ' + 'token: ' + user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }, err => {
        console.log(err);
        alert('Login failed !' + err);
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
