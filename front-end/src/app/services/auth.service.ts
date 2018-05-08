import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
//import "rxjs/add/operators";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //properties
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  // fix observable

  registerUser(user){
    let headers = new Headers();
    //add content type to headers
    headers.append('Content-Type', 'application/json');

    //return by post the request
    return this.http.post('http://localhost:3000/users/register',
      user, {headers: headers}).map(res => res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
