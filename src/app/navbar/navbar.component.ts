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
      if (value) {
        this.loadUserData();
      }
  });

   }

  ngOnInit(): void {
    this.sessionData = this.sessionService.getSessionData();
    this.authService.getLoggedInStatus().then((value) => {
      this.isLoggedIn = value;
      if (this.isLoggedIn) {
        this.loadUserData(); // Load user data if initially logged in
      }
    });
  }

  logout(){
    this.sessionService.clearSession();
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  private async loadUserData() {
    this.sessionData = this.sessionService.getSessionData();
    this.name = this.sessionData.name;
    // Convert the name to lowercase
    const lowercaseName = this.name.toLowerCase();

    // Convert the first letter to uppercase
    this.name = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);
  }

  goToLoginPage(){
    this.router.navigateByUrl("/login");
  }

}
