import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { NewpostComponent } from './newpost/newpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent
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
    component : ProfileComponent
  },
  {
    path : 'edit',
    component : EditComponent
  },
  {
    path : 'newpost',
    component : NewpostComponent
  },
  {
    path : 'editPost/:postId',
    component : EditpostComponent
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
