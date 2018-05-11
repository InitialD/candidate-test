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

    emp: Array<Company>;

  ngOnInit() {
    /*if it exists TODOODODODO
    this.aR.params.subscribe((params) => {
      if (params['id']) {
        this._articleService.getArticle(params['id'])
          .subscribe(res => {

            this.article = res;

            this.articleFrm = this.fb.group({
              'title' : [this.article['title'], Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
              'content' : [this.article['content'], Validators.compose([Validators.required, Validators.minLength(10)])],
            });
          });
      } else {
        this.articleFrm = this.fb.group({
          'title' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
          'content' : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
        });
      }
    })*/
  } //end of ngOnInit

  validateSubmission(info){
    if(info.name == undefined || info.employee == undefined){
        return false;
      } else{
        return true;
      }
  }

  addEmployee(currEmp) {
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
    console.log("found and updating in creat.comp "+currEmp);
        //if employee exists
        if(currEmp !== undefined){
          console.log("found and updating in creat.comp "+emp);
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
        else{
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
    }
  }

}
