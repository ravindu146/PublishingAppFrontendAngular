import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './../session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn : Boolean ;
  sessionData : any;

  constructor(private router : Router, private sessionService: SessionService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.sessionData = this.sessionService.getSessionData();
      if(this.sessionData){
        // if(state.url === "/login"){
        //   this.router.navigate(['/profile'])
        //   return false;
        // }
        return true;
      } else{
        this.router.navigate(["/login"]);
        return false;
      }
  }

}
