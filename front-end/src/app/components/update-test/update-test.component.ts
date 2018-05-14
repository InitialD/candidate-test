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

    name: String;
    employee: String;
    emptest: any;
    emp: Array<Company>;
    currEmp: any;

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id = params["id"];
      console.log(id);
      //get employee info
      this.companyService.getEmployee(id).subscribe(res => this.emp = res);
      //get test from employee info
      this.testService.getTests(id).subscribe(res => this.emptest = res);
    });
  }

}
