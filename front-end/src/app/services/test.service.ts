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
      console.log("CALLING gettest");
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/tests/dashboard/'+id)
        .map(result => this.result = result.json());
    }

    insertTest(test, id) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      //'dashboard/create'
      return this.http.post('http://localhost:3000/companies/dashboard/'+id+'/addtest', test, {headers: headers})
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
