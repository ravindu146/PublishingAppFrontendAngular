import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpClient , private router: Router , private authService : AuthService){}

  ngOnInit(): void {
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required]),

  });

  get f(){
    return this.form.controls;
  }

  async submit(){
    console.log(this.form.value);

    let emailExists : boolean;
    emailExists = await this.checkIfEmailExists(this.form.value.email);
    if(!emailExists){
      this.http.post("http://localhost:8085/api/v1/user/save",this.form.value,{responseType: "text"}).subscribe((resultData: any)=>
        {
          let userId :number = resultData;
          alert("Employee Registered successfully");
          this.router.navigateByUrl("/login");
        });
    }
    else {
      alert("This Email is Already Registered. Try with a new Email!");
    }
  }

  checkIfEmailExists(email: string): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      const requestUrl = `http://localhost:8085/api/v1/user/checkexists?email=${email}`;

      this.http.get(requestUrl).subscribe((emailExists: boolean) => {
        resolve(emailExists);
      }, (error) => {
        reject(error);
      });
    });
  }

}
