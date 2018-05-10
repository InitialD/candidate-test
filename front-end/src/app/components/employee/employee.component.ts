import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private companyService:CompanyService,
    private router:Router,
    private aR:ActivatedRoute
  ) { }
  company: any;
  ngOnInit() {

    this.aR.params.subscribe((params) => {
      let id = params["id"];
      console.log('Two '+id);
      this.companyService.getEmployee(id).subscribe(res => this.company = res);
    });
  }

}
