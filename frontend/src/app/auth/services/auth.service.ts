import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Credentials } from "../../shared/models/Credential.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuth$!: BehaviorSubject<boolean>;

  constructor(
    // External services
    private http: HttpClient,
    private router: Router,
    private cookies: CookieService,
  ) { 
    this.isAuth$ = new BehaviorSubject(this.isAuth());
  }

  loginUser(email: string, password: string) {
    return this.http.post<Credentials>
      (`${environment.baseUrl}/login`, { email: email, password: password })
      .pipe(
        tap((credentials) => {
          this.setCredentials(credentials);
          this.isAuth$.next(true);
        }), catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
      );
  } // loginUser(email: string, password: string)


  logout() {
    this.clearCredentials();
    this.isAuth$.next(false);
    this.router.navigate(["login"]);
  } // logout()  


  private setCredentials(credentials: Credentials) {
    this.cookies.set("token", credentials.token);
    this.cookies.set("userId", credentials.userId);
    this.cookies.set("userRole", credentials.userRole);
  }

  /**
   * Reset Credential cookies
   */
  private clearCredentials() {
    this.cookies.deleteAll();
  }

  getCredentials(): Credentials {
    const token = this.cookies.get("token");
    const userId = this.cookies.get("userId");
    const userRole = this.cookies.get("userRole");
    return { userId, token, userRole };
  }

  /**
   * Check if logged user is an admin
   * @returns boolean
   */
  isAdmin(): boolean {
    const { userRole } = this.getCredentials();
    return this.isAuth() && userRole === "admin";
  }

  /**
   * Check if user has authorization
   * @returns boolean
   */
  isAuth(): boolean {
    const { userId, token } = this.getCredentials();
    return !!token && !!userId;
  }


} // export class AuthService


