import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Company } from "../company";
import { Test } from "../test";

@Injectable({providedIn: 'root'})
export class TestService {

  result:any;
  id:any;

  constructor(
    private http: Http
    ) { }

    getTests(id) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/tests/dashboard/'+id)
        .map(result => this.result = result.json());
    }

    getTest(id,tid) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/tests/dashboard/'+id+'/'+tid)
        .map(result => this.result = result.json());
    }

    insertTest(test, id) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/tests/dashboard/'+id+'/addtest', test, {headers: headers})
        .map(result => this.result = result.json());
    }

    removeTest(empId, currTest) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/tests/dashboard/delete/'+empId+'/'+currTest)
        .map(result => this.result = result.json());
    }

    updateTest(test, empId, testId) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/tests/dashboard/update/'+empId+'/'+testId, test, {headers: headers})
        .map(result => this.result = result.json());
    }

      validateTest(test){
        if(test.testname == undefined ||
          ((test.result != "Pass") && (test.result != "Fail"))){
            return false;
          } else{
            return true;
          }
        }
}
