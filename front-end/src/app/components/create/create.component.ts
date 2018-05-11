import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private router:Router,
    private aR: ActivatedRoute,
    private companyService:CompanyService) { }

    name: String;
    employee: String;

  ngOnInit() {
    /*this.companyService.getCompanies()
      .subscribe(res=> this.emps = res);

    this.aR.params.subscribe((params) => {
      if (params['id']) {
        this.companyService.getEmployee(params['id'])
          .subscribe(res => {

            this.company = res;

            this.empFrm = this.fb.group({
              'name' : [this.company['name']],
              'employee' : [this.company['employee']],
            });
          });
      } else {
        this.empFrm = this.fb.group({
          'name' : [null],
          'employee' : [null],
        });
      }
    });*/
  }

  validateSubmission(info){
    if(info.name == undefined || info.employee == undefined){
        return false;
      } else{
        return true;
      }
  }

  addEmployee() {
    const emp = {
      name: this.name,
      employee: this.employee
    }
    //Check Fields
    if(!this.validateSubmission(emp)){
      this.flashMessage.show('Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

        //Add Employee (observable)
        this.companyService.insertEmployee(emp).subscribe(data => {
          if(data.success){
            this.flashMessage.show('Add Successful',
              {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/dashboard']);
          }else{
            this.flashMessage.show('Error Creating',
              {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/dashboard/create']);
          }
        });
    //}
  }

}
