import { Component, OnInit } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userEmail : String | null = null;
  userId : number | null = null;
  userData : any;
  postDataForUser : any;

  constructor(private authService: AuthService , private http : HttpClient , private router : Router) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userId = this.authService.getUserId();

    if(this.userEmail){
      this.loadUserData();
    }
    if(this.userId){
      this.loadPostData();
    }
  }

  loadUserData(){
    this.http.get(`http://localhost:8085/api/v1/user/getuser?email=${this.userEmail}`).subscribe((data:any)=> {
        this.userData = data;
        console.log(this.userData);
      });
  }

  loadPostData(){
    this.http.get(`http://localhost:8085/api/v1/posts/user/${this.userId}/posts`).subscribe((postData:any)=>{
        this.postDataForUser = postData;
        console.log(this.postDataForUser);
      });
  }

  goToEditPage() {
    this.router.navigateByUrl("/edit");
  }

  logout(){
    this.router.navigateByUrl("/");
  }

  goToNewPostPage(){
    this.router.navigateByUrl("/newpost");
  }

  editPost(postId : number){
    this.router.navigate(['/editPost',postId]);
  }
}
