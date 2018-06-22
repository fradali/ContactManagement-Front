import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8090/signin?username=' + username + '&password=' + password,
      null)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('token: ' + user.token);
          localStorage.setItem('token', user.token);
        }
        // return user;
      }, err => {
        console.log(err);
        alert('Login failed !' + err);
      }));
  }

  // login(username: string, password: string): Observable<any> {
  //   console.log('login ------------------');
  //   return this.http.post('http://localhost:8090/signin?username=' + username + '&password=' + password,  null).pipe(
  //     map(resp => resp));
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
