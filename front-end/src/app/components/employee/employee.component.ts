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
  emp: any;
  ngOnInit() {

    this.aR.params.subscribe((params) => {
      let id = params["id"];
      this.companyService.getEmployee(id).subscribe(res => this.emp = res);

      console.log('Employee '+ this.emp);
    });
  }

}
