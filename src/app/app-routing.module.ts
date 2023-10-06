import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { NewpostComponent } from './newpost/newpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthGuard } from './Services/guards/auth.guard';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'home',
    component: HomeComponent
  }
  ,{
    path : 'register',
    component : RegistrationComponent
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'edit',
    component : EditComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'newpost',
    component : NewpostComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'editPost/:postId',
    component : EditpostComponent,
    canActivate : [AuthGuard]
  },{
    path : 'newsFeed',
    component : NewsfeedComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
