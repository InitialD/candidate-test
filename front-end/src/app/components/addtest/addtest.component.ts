import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { TestService } from "../../services/test.service";
import { Company } from "../../company";
import { Test } from "../../test";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private router:Router,
    private aR: ActivatedRoute,
    private companyService:CompanyService,
    private testService:TestService) { }

    _id: any;
    testname:String;
    result:String;
    currEmp: any;

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id = params["id"];
      this.companyService.getEmployee(id).subscribe(res => this.currEmp = res);
    });

  }

  addTest(currEmpId) {
    const newtest = {
      _id: currEmpId,
      testname: this.testname,
      result: this.result
    }
    //Check Fields
    if(!this.testService.validateTest(newtest)){
      this.flashMessage.show('Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
        //Add Test (observable)
        this.testService.insertTest(newtest, currEmpId).subscribe(data => {
          if(data.success){
            this.flashMessage.show('Add Test Successful',
              {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/dashboard/companies/'+currEmpId]);
          }else{
            this.flashMessage.show('Error Creating Test',
              {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/dashboard']);
          }
        });

  }
}
