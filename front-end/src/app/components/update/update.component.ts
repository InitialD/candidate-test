import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private router:Router,
    private aR: ActivatedRoute,
    private companyService:CompanyService) { }

    name: String;
    employee: String;

    emp: Array<Company>;
    currEmp: any;

  ngOnInit() {
    //get the id from the Url
    this.aR.params.subscribe((params) => {
      let id = params["id"];
      this.companyService.getEmployee(id).subscribe(res => this.currEmp = res);

    });
  }

  upEmployee(currEmp) {
    const emp = {
      name: this.name,
      employee: this.employee
    }
    //Check Fields
    if(!this.companyService.validateSubmission(emp)){
      this.flashMessage.show('Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.companyService.updateEmployee(emp, currEmp).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Update Successful',
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessage.show('Error Updating',
          {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard/create']);
      }
    });
  }

}
