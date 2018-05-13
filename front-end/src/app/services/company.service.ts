import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Company } from "../company";
import { Test } from "../test";

@Injectable({providedIn: 'root'})
export class CompanyService {

  result:any;
  id:any;

  constructor(
    private http: Http
    ) { }

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

  //really needed?
  getTests(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/companies/dashboard/'+id)
      .map(result => this.result = result.json());
  }

  //To-Do implement in front end
  findEmployee(name) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/companies/dashboard/')
      .map(result => this.result = result.json());
  }

  insertEmployee(company) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //'dashboard/create'
    return this.http.post('http://localhost:3000/companies/dashboard/create', company, {headers: headers})
      .map(result => this.result = result.json());
  }

  updateEmployee(company, id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //let options = new RequestOptions({ headers: headers });
    console.log("updating "+company);
    //'dashboard/create'
    return this.http.post('http://localhost:3000/companies/dashboard/update/'+id, company, {headers: headers})
      .map(result => this.result = result.json());
  }

  deleteEmployee(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/companies/dashboard/delete/'+id)
      .map(result => this.result = result.json());
  }

  validateSubmission(info){
    if(info.name == undefined || info.employee == undefined){
        return false;
      } else{
        return true;
      }
    }

}
