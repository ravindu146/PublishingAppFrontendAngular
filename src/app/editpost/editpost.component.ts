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
  selectedImage: File | null = null;

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
          imageName:[this.userData.imageName, []],
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

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];
      console.log(this.selectedImage);

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


  update(){
    console.log("This is data taken when you just submit the form");
    console.log(this.form.value);

    const imageFileName = this.form.value.imageName;

    const { imageName, ...postData } = this.form.value;

    const startDate = this.form.value.startDateControl ? new Date(Date.UTC(this.form.value.startDateControl.year, this.form.value.startDateControl.month -1, this.form.value.startDateControl.day)) : null;
    const endDate = this.form.value.endDateControl ? new Date(Date.UTC(this.form.value.endDateControl.year, this.form.value.endDateControl.month - 1, this.form.value.endDateControl.day)) : null;

    // const formData = {
    //   topic: this.form.value.topic,
    //   content: this.form.value.content,
    //   startDate: startDate,
    //   endDate: endDate
    // };

    const formData = {
      ...postData,
      startDate: startDate,
      endDate: endDate,
      imageName: imageFileName
    };

    console.log("This is post values just before update ");
    console.log(formData);


    this.http.put(`http://localhost:8085/api/v1/posts/update?postId=${this.postId}`,formData).subscribe((resultData: any)=>{
      let result = resultData;

      if (result.message == "Data Updated Successfully"){
          alert("Post Details Updated Successfully");
          this.router.navigateByUrl("/profile");
      }
      else {
        alert("Post data Did not update successfully");
      }
    });
  }

}
