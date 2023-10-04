import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../Services/session.service';
import { AuthService } from './../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sessionData : any;
  name : String = null;
  isLoggedIn : boolean;



  constructor(private router : Router, private sessionService:SessionService, private authService:AuthService) {
    this.authService.loggedIn.subscribe( value => {
      this.isLoggedIn = value;
  });

   }

  ngOnInit(): void {
    this.sessionData = this.sessionService.getSessionData();
    if (this.sessionData && this.sessionData.name) {
      this.name = this.sessionData.name;
    }
  }

  logout(){
    this.sessionService.clearSession();
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

  goToLoginPage(){
    this.router.navigateByUrl("/");
  }

}
