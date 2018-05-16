import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { TestService } from "../../services/test.service";
import { Company } from "../../company";
import { Test } from "../../test";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private companyService:CompanyService,
    private flashMessage:FlashMessagesService,
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
    // TODO: when deleting an employee, also delete all the tests associated with it
     this.companyService.deleteEmployee(empId)
       .subscribe(data => {
         if(data.success){
           this.flashMessage.show('Delete Successful',
             {cssClass: 'alert-success', timeout: 3000});
         }else{
           this.flashMessage.show('Error Deleting',
             {cssClass: 'alert-danger', timeout: 3000});
         }
         this.router.navigateByUrl('/dashboard');
       })
   }


   deleteTest(empId, currTest) {
      this.testService.removeTest(empId, currTest)
        .subscribe(res => {
          this.router.navigateByUrl('/dashboard/companies/'+empId, { skipLocationChange: true });
        })
    }

}
