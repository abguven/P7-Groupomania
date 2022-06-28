import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap, map } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userForm!: FormGroup;
  loading!: boolean;
  errorMsg!: string;
  //user!: User;
  userId!: string;
  ignorePassword = true;
  resetAvatar = false;
  readonly defaultPasswordValidator =  [Validators.required];
  readonly defaultAvatarPreviewImage = "../../assets/default-profile-picture.jpg";
  avatarPreview!:string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private users: UsersService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const passwordValidator = this.ignorePassword ? null : this.defaultPasswordValidator;   
    this.avatarPreview = this.defaultAvatarPreviewImage; 
    this.route.params.pipe(
      map(params => params["id"]),
      switchMap(id => this.users.getUserById(id)),
      tap(user => {
        this.userId = user.uuid;
        this.userForm = this.formBuilder.group({
          email: [user.email, [Validators.required, Validators.email]],
          password: ["", passwordValidator], 
          user_name: [user.user_name, Validators.required],
          last_name: [user.last_name? user.last_name: ""],
          avatar: [user.avatar_url],
        });
        if (user.avatar_url){
          this.avatarPreview = user.avatar_url;
        }
        this.loading = false;
      }),
      catchError(error => this.errorMsg = JSON.stringify(error))
    ).subscribe();
  } // ngOnInit(): void

  onUpdate(){
    this.loading = true;
    // Get user informations from the form
    const user = new User();
    user.email = this.userForm.get("email")?.value;
 
    if (this.ignorePassword){
      user.password = "";
    }else{
      user.password = this.userForm.get("password")?.value;
    }

    user.user_name = this.userForm.get("user_name")?.value;
    user.last_name = this.userForm.get("last_name")?.value;  
    
    user.uuid = this.userId; // This id must be get from url parameteres, not from session information !!!

    this.users.modifiyUser(user, this.userForm.get("avatar")?.value, this.ignorePassword , this.resetAvatar)
      .pipe(
        tap(()=>{
          this.loading = false;
          this.router.navigate(['/posts']);
        }),
        catchError(error => {
          this.loading = false;
          this.errorMsg = error;
          return EMPTY;
        })
      ).subscribe();

  } // onUpdate()

  onCancel(){
    this.userForm.reset();
    this.router.navigateByUrl("/");
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

/**
 * If user wants to update the password set the vaditators for the password field.
 * Otherwise clear validators.
 */
  onPasswordSelected(event: Event){
    this.ignorePassword = !(event.target as HTMLInputElement).checked; 
    if (!this.ignorePassword){
      this.userForm.get("password")?.setValidators(this.defaultPasswordValidator);
      this.userForm.get("password")?.updateValueAndValidity();
    }else{
      this.userForm.get("password")?.clearValidators();
      this.userForm.get("password")?.updateValueAndValidity();
    }
  }
} // export class UserUpdateComponent implements OnInit 
