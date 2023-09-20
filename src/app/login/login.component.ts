import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from './../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email : string = "";
  // password : string = "";

  constructor(private http: HttpClient, private router: Router , private authService : AuthService){}

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
    console.log(this.form.value);
    this.http.post("http://localhost:8085/api/v1/user/login", this.form.value).subscribe((resultData:any)=>{

      // console.log(resultData);

      if(resultData.message == "Email not exists"){
        alert("Email not exists");
      }
      else if(resultData.message == "Login Success"){
        this.authService.login(this.form.value.email);
        this.authService.setUserId(resultData.userId);
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
