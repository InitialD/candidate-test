import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { TestService } from "../../services/test.service";
import { Test } from "../../test";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  constructor(  private flashMessage:FlashMessagesService,
    private router:Router,
    private aR: ActivatedRoute,
    private testService:TestService,
    private companyService:CompanyService) { }

    currTest: Array<Test>;
    currEmp: any;
    testname: String;
    result: String;

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id = params["id"];
      let tid = params["tid"];
      //get employee info
      this.companyService.getEmployee(id).subscribe(res => this.currEmp = res);
      //get test from employee info
      this.testService.getTest(id,tid).subscribe(res => this.currTest = res);
    });
  }

  upTest(currEmp, currTest) {
    const newTest = {
      testname: this.testname,
      result: this.result
    }
    //Check Fields
    if(!this.testService.validateTest(newTest)){
      this.flashMessage.show('Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.testService.updateTest(newTest, currEmp, currTest).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Update Successful',
          {cssClass: 'alert-success', timeout: 3000});

      }else{
        this.flashMessage.show('Error Updating',
          {cssClass: 'alert-danger', timeout: 3000});
      }
      this.router.navigateByUrl('/dashboard/companies/' + this.currEmp._id);
    });
  }

}
