import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

  constructor(private http: HttpClient , private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    topic: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get f(){
    return this.form.controls;
  }

  submitPost(){
    console.log(this.form.value);

    // this.http.post(`http://localhost:8085/api/v1/posts/save?userId=${this.authService.getUserId()}`,this.form.value).subscribe((resultData : any) => {
    //     let result : any = resultData;
    //     console.log(result);
    // });

    this.http.post(`http://localhost:8085/api/v1/posts/save?userId=${this.authService.getUserId()}`, this.form.value, { responseType: 'text' })
    .subscribe(
      (resultData: any) => {
        let result : any = resultData;
        alert(result);
        // Handle the success response here
      },
      (error) => {
        console.error(error);
        // Handle the error here, display an error message, or take appropriate action
      }
    );
  }


}
