import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './posts/components/post-list/postlist.component';
import { UpdatePostComponent } from './posts/components/update-post/update-post.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

const routes: Routes = [
  { path:"login" , component: LoginComponent },
  { path:"signup" , component: SignupComponent },  // Signup new user
  { path:"modify-profile/:id" , component: UserUpdateComponent, canActivate: [AuthGuard] }, // Update user profile
  { path:"posts" , component: PostListComponent, canActivate: [AuthGuard] },
  { path: "posts/modify-post/:id", component: UpdatePostComponent, canActivate: [AuthGuard] },
  { path: "", pathMatch: "full" , redirectTo: "posts"},
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
