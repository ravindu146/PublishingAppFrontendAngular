import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userEmail : string | null = null;
  private userId : number | null = null;
  sessionData : any = null;

  // private isLoggedIn : boolean = false;


  constructor(private sessionService : SessionService) {
    this.sessionData = this.sessionService.getSessionData();

    if(this.sessionData){
      this.loggedIn.next(true);
    }

  }

  login(){
    this.sessionData = this.sessionService.getSessionData();
    console.log("login set to true");
    this.loggedIn.next(true);
    console.log(this.sessionData);


  }

  getUserEmail() : string {
    return this.userEmail;
  }

  setUserId(userId : number )   {
    this.userId = userId;
  }

  getUserId() : number {
    return this.userId;
  }

  logout(){
    console.log("login set to false");
    this.loggedIn.next(false);
    console.log(this.loggedIn);
    console.log(this.sessionData);

  }

  isLoggedIn(){
    console.log("This is in isLoggedIn");
    console.log(this.loggedIn.asObservable());
    return this.loggedIn.asObservable();
  }


}
