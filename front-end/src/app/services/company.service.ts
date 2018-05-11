import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({providedIn: 'root'})
export class CompanyService {

  result:any;
  id:any;

  constructor(private http: Http) { }

  getCompanies() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/companies/dashboard')
      .map(result => this.result = result.json());
  }

  getEmployee(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/companies/dashboard/'+id)
      .map(result => this.result = result.json());
  }
}
