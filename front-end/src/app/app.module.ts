import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { AddtestComponent } from './components/addtest/addtest.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { FindComponent } from './components/find/find.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';
import { AuthGuard } from "./guard/auth.guard";
import { CompanyService } from "./services/company.service";
import { TestService } from "./services/test.service";


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'dashboard/create', component: CreateComponent, canActivate:[AuthGuard]},
  {path:'dashboard/update/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path:'dashboard/update/:id/:tid', component: UpdateTestComponent, canActivate:[AuthGuard]},
  {path:'dashboard/companies/:id', component: EmployeeComponent, canActivate:[AuthGuard]},
  {path:'dashboard/addtest/:id', component: AddtestComponent, canActivate:[AuthGuard]},
  {path:'dashboard/results/:name', component: FindComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    EmployeeComponent,
    CreateComponent,
    UpdateComponent,
    AddtestComponent,
    UpdateTestComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FlashMessagesModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [ValidateService, AuthService, AuthGuard, CompanyService, TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
