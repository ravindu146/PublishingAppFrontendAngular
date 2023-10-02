import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  postDataForUser : any;


  constructor(private http : HttpClient , private router : Router) { }

  ngOnInit(): void {
    this.loadPostData();

  }

  loadPostData(){
    this.http.get(`http://localhost:8085/api/v1/posts/getAllPosts`).subscribe((postData:any)=>{
        this.postDataForUser = postData;
        console.log(this.postDataForUser);
      });
  }

}
