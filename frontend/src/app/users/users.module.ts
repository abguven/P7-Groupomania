import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SignupComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
  
  ]
})
export class UsersModule { }
