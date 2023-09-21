import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  postId : number;
  userData : any;
  form: FormGroup;

  constructor(private route : ActivatedRoute, private http: HttpClient ,private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.postId =  +params['postId'];
    });
   }

  ngOnInit(): void {
      this.buildForm();
  }

  get f(){
    return this.form.controls;
  }
  buildForm(){
    this.http.get(`http://localhost:8085/api/v1/posts/getPostById/${this.postId}`).subscribe((data:any)=> {
        this.userData = data;
        console.log(this.userData);

        this.form = this.formBuilder.group({
          topic: [this.userData.topic, [Validators.required, Validators.minLength(3)]],
          content: [this.userData.content, [Validators.required, Validators.minLength(3)]],
          startDateControl: this.userData.startDate==null?[[this.userData.startDate],null]:[this.convertToNgbDate(this.userData.startDate), null],
          endDateControl:  this.userData.endDate==null?[[this.userData.endDate],null]:[this.convertToNgbDate(this.userData.endDate), null]
        });
      });
  }

  convertToNgbDate(dateString: string): NgbDateStruct {
    const dateParts = dateString.split('-').map(Number);
    if (dateParts.length === 3) {
      return { year: dateParts[0], month: dateParts[1], day: dateParts[2] };
    }
    return null;
  }
  

  update(){
    console.log(this.form.value);


    // this.http.put(`http://localhost:8085/api/v1/user/update?email=${this.userEmail}`,this.form.value).subscribe((resultData: any)=>{
    //   let result = resultData;

    //   if (result.message == "User Updated successfully!"){
    //       alert("User Details Updated Successfully");
    //       this.router.navigateByUrl("/profile");
    //   }
    //   else {
    //     alert("Data Did not update successfully");
    //   }
    // });
  }

}
