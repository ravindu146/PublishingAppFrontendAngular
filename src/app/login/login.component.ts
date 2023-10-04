import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from './../Services/auth.service';
import { SessionService } from './../Services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authService:AuthService, private sessionService: SessionService){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
  }



  login() {
    this.http.post("http://localhost:8085/api/v1/user/login", this.form.value).subscribe((resultData:any)=>{


      if(resultData.message == "Email not exists"){
        alert("Email not exists");
      }
      else if(resultData.message == "Login Success"){
        const userData = { userId : resultData.userId, email : this.form.value.email, token: resultData.userId, name : resultData.name };
        this.sessionService.setSessionData(userData);
        this.authService.login();
        this.router.navigateByUrl("/profile");
      }
      else {
        alert ("Incorrect Email and Password not match ");
      }
    })
  }

  goToRegistration(){
    this.router.navigateByUrl("/register");
  }

}
