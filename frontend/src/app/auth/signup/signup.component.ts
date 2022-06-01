import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, EMPTY, switchMap, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/tools/customValidators'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  loading!: boolean;
  errorMsg!: string;
  //userId!: string;
  resetAvatar = false;
  readonly defaultAvatarPreviewImage = "../../assets/default-profile-picture.jpg";
  avatarPreview!:string;

  constructor(
    private formBuilder: FormBuilder,
    private users: UsersService,
    private auth: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.avatarPreview = this.defaultAvatarPreviewImage;
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email] ],
      user_name: [null, Validators.required],
      last_name: [null],
      avatar: [null],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    },
    {
        validator: CustomValidators.mustMatch("password","passwordConfirmation")
    })
  } // ngOnInit(): void


  onSubmit(){
    this.loading = true;
    
    // Get user informations from the form
    const newUser = new User();
    newUser.email = this.userForm.get("email")?.value;
    newUser.password = this.userForm.get("password")?.value;
    newUser.user_name = this.userForm.get("user_name")?.value;
    newUser.last_name = this.userForm.get("last_name")?.value;

    this.users.createUser(newUser, this.userForm.get("avatar")?.value)
    .pipe(
      switchMap(() => this.auth.loginUser(newUser.email, newUser.password)),
      tap(() => {
        this.loading = false;
        this.router.navigate(["/posts"]);
      }),
      catchError(error => {
        this.loading = false;
        this.errorMsg = error;
        return EMPTY;
      })
    ).subscribe();

  }


  onFileAdded(event: Event){ 
    this.loading = true;
    const file = (event.target as HTMLInputElement).files![0];
    this.userForm.get("avatar")?.setValue(file);
    this.userForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
      this.resetAvatar = false;
      this.loading = false;
    }
    reader.onerror = () => {
      this.loading = false;
    }
    reader.readAsDataURL(file);    
  } // onFileAdded(event: Event)

  onDeleteImage(){
    this.userForm.get("avatar")?.setValue(null);
    this.userForm.updateValueAndValidity();
    this.avatarPreview = this.defaultAvatarPreviewImage;
    this.resetAvatar = true;
  }

  get passwordConfirmation(){
    return this.userForm.controls["passwordConfirmation"];
  }

  

} // export class SignupComponent
