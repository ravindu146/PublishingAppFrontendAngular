import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    startDateControl: new FormControl(null),
    endDateControl: new FormControl(null)
  });

  get f(){
    return this.form.controls;
  }

  submitPost(){
    console.log(this.form.value);
    const startDate = this.form.value.startDateControl ? new Date(Date.UTC(this.form.value.startDateControl.year, this.form.value.startDateControl.month - 1, this.form.value.startDateControl.day)) : null;
    const endDate = this.form.value.endDateControl ? new Date(Date.UTC(this.form.value.endDateControl.year, this.form.value.endDateControl.month - 1, this.form.value.endDateControl.day)) : null;

    const formData = {
      topic: this.form.value.topic,
      content: this.form.value.content,
      startDate: startDate,
      endDate: endDate
    };

    this.http.post(`http://localhost:8085/api/v1/posts/save?userId=${this.authService.getUserId()}`, formData, { responseType: 'text' })
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
