import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../company";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private companyService:CompanyService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }
  name: String;
  company: any;
  companies: any;

  ngOnInit() {
    this.companyService.getCompanies().subscribe(res => this.companies = res);
  }

  searchEmployee(){
    this.router.navigateByUrl('/dashboard/results/'+this.name);
  }

  }
