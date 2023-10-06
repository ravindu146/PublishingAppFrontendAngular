import { Component, OnInit } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from './../Services/session.service';


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
  userSession : any;

  constructor( private http : HttpClient , private router : Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.userSession = this.sessionService.getSessionData();
    // this.userEmail = this.authService.getUserEmail();
    // this.userId = this.authService.getUserId();

    this.userEmail = this.userSession.email;
    this.userId = this.userSession.userId;

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
      });
  }

  loadPostData(){
    this.http.get(`http://localhost:8085/api/v1/posts/user/${this.userId}/posts`).subscribe((postData:any)=>{
        this.postDataForUser = postData;
      });
  }

  goToEditPage() {
    this.router.navigateByUrl("/edit");
  }

  logout(){
    this.router.navigateByUrl("/login");
  }

  goToNewPostPage(){
    this.router.navigateByUrl("/newpost");
  }

  editPost(postId : number){
    this.router.navigate(['/editPost',postId]);
  }
}
