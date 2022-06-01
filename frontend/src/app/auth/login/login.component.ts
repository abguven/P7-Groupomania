import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loading!: boolean;
  loginForm!: FormGroup;
  errorMsg!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService, 
    ) { }

  ngOnInit(): void {
    // Form validation
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  } // ngOnInit(): void

  onLogin(){
    this.loading = true;
    const email = this.loginForm.get("email")?.value;
    const password  = this.loginForm.get("password")?.value;
    this.auth.loginUser(email, password)
      .pipe(
        tap(() => {
          this.loading = false;
          this.router.navigate(["/posts"]);
        }),
        catchError( error => {
          this.loading = false;
          console.log("error: ", error);
          this.errorMsg = error.error.error;
          return EMPTY;
        })
      ).subscribe();

  } // onLogin()



} // export class LoginComponent implements OnInit
