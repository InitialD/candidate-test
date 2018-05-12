import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { TestService } from "../../services/test.service";
import { Company } from "../../company";
import { Test } from "../../test";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private companyService:CompanyService,
    private testService:TestService,
    private router:Router,
    private aR:ActivatedRoute
  ) { }

  company: any;
  emp: any;
  emptest: any;

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id = params["id"];
      //get employee info
      this.companyService.getEmployee(id).subscribe(res => this.emp = res);
      //get test from employee info
      this.testService.getTests(id).subscribe(res => this.emptest = res);
    });
  }

  deleteEmployee(empId) {
     this.companyService.deleteEmployee(empId)
       .subscribe(res => {
         this.router.navigateByUrl('/dashboard');
       })
   }

}
