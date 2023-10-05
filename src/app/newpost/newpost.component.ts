import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from './../Services/session.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

  selectedImage: File | null = null;
  sessionData : any;

  constructor(private http: HttpClient , private router: Router, private sessionService: SessionService ) { }

  ngOnInit(): void {
    this.sessionData = this.sessionService.getSessionData();
  }



  form = new FormGroup({
    topic: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDateControl: new FormControl(null),
    endDateControl: new FormControl(null),
    imageName: new FormControl(null)
  });

  get f(){
    return this.form.controls;
  }

  submitPost(){
    console.log(this.form.value);

    const imageFileName = this.form.value.imageName;

    const { imageName, ...postData } = this.form.value;

    const startDate = this.form.value.startDateControl ? new Date(Date.UTC(this.form.value.startDateControl.year, this.form.value.startDateControl.month - 1, this.form.value.startDateControl.day)) : null;
    const endDate = this.form.value.endDateControl ? new Date(Date.UTC(this.form.value.endDateControl.year, this.form.value.endDateControl.month - 1, this.form.value.endDateControl.day)) : null;

    const formData = {
      ...postData,
      startDate: startDate,
      endDate: endDate,
      imageName: imageFileName
    };

    this.http.post(`http://localhost:8085/api/v1/posts/save?userId=${this.sessionData.userId}`, formData, { responseType: 'text' })
    .subscribe(
      (resultData: any) => {
        let result : any = resultData;
        alert(result);
        this.router.navigateByUrl("/profile");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];

      this.uploadImage();
    }
  }

  uploadImage() {
    if (!this.selectedImage) {
      console.log("No image selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.http.post('http://localhost:8085/api/v1/posts/upload-image', formData)
      .subscribe(
        (imageResponse: any) => {
          this.form.patchValue({ imageName: imageResponse.imageName });
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
  }


}
