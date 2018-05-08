import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private ValidateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private AuthService: AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user ={
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    //Check Fields
    if(!this.ValidateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    //Validate email
    if(!this.ValidateService.validateEmail(user.email)){
      this.flashMessage.show('Please use valid email',
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register User (observable)
    this.AuthService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Register Complete',
          {cssClass: 'alert-success', timeout: 3000});

          //redirect
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Error Registering',
          {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
