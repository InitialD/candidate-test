import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
//import "rxjs/add/operators";
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //properties
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  // fix observable
  
  /*registerUser(user){
    let headers = new Headers();
    //add content type to headers
    headers.append('Content-Type', 'application/json');

    //return by post the request
    return this.http.post('http://localhost:3000/users/register',
      user, {headers: headers}).map(res => res.json());
  }*/
}
