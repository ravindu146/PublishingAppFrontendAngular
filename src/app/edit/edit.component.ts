import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userEmail : String;
  userData : any;
  form: FormGroup;

  constructor(private http: HttpClient ,private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.userEmail = this.authService.getUserEmail();

    if(this.userEmail){
      // call the formBuilder
      this.buildForm();
    }
  }

  // form = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  //   password: new FormControl('', [Validators.required]),

  // });

  get f(){
    return this.form.controls;
  }

  buildForm(){
    this.http.get(`http://localhost:8085/api/v1/user/getuser?email=${this.userEmail}`).subscribe((data:any)=> {
        this.userData = data;
        console.log(this.userData);

        this.form = this.formBuilder.group({
          name: [this.userData.name, [Validators.required, Validators.minLength(3)]],
          email: [this.userData.email, [Validators.required, Validators.email]],
          mobile: [this.userData.mobile, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]],
          password: [this.userData.password, [Validators.required]],
        });
      });
  }

  update(){
    this.http.put(`http://localhost:8085/api/v1/user/update?email=${this.userEmail}`,this.form.value).subscribe((resultData: any)=>{
      let result = resultData;

      if (result.message == "User Updated successfully!"){
          alert("User Details Updated Successfully");
          this.router.navigateByUrl("/profile");
      }
      else {
        alert("Data Did not update successfully");
      }
    });
  }



}
