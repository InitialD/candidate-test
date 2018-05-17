import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  constructor(
    private companyService:CompanyService,
    private flashMessage:FlashMessagesService,
    private aR: ActivatedRoute,
    private router:Router
  ) { }

    name: String;
    currEmp: any;

  ngOnInit() {
   this.aR.params.subscribe((params) => {
      let name = params["name"];
      this.companyService.findEmployee(name).subscribe(res => this.currEmp = res);
    });
  }

}
