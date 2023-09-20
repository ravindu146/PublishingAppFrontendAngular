import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEmail : string | null = null;
  private userId : number | null = null;

  login (email : string){
    this.userEmail = email;
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

  constructor() { }
}
