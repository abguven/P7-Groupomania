import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

const routes: Routes = [
  { path:"login" , component: LoginComponent },
  { path:"signup" , component: SignupComponent },  // Signup new user
  { path:"modify-profile/:id" , component: UserUpdateComponent }, // Update user profile
  { path:"posts" , component: PostsComponent },
  { path: "", pathMatch: "full" , redirectTo: "signup"},
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
