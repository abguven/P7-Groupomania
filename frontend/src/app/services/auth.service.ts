import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Credentials } from "../shared/models/Credential.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(
    // External services
    private http: HttpClient,
    private router: Router,
    private cookies: CookieService,
  ) { }

  loginUser(email: string, password: string) {
    return this.http.post<Credentials>
      (`${baseUrl}/login`, { email: email, password: password })
      .pipe(
        tap( (credentials) => {
          this.setCredentials(credentials);
          this.isAuth$.next(true); 
        })
      );
  } // loginUser(email: string, password: string)

  
  logout(){
    this.clearCredentials();
    this.isAuth$.next(false);
    this.router.navigate(["login"]);
  } // logout()  
  
  
  setCredentials( credentials: Credentials){
    this.cookies.set("token", credentials.token);
    this.cookies.set("userId", credentials.userId);
    this.cookies.set("userRole", credentials.userRole);
  }

  clearCredentials(){
    this.cookies.deleteAll();
  }

  getCredentials():Credentials{
    const token = this.cookies.get("token");
    const userId = this.cookies.get("userId");
    const userRole = this.cookies.get("userRole");
    //console.log("%c userId", "color: yellow" , userId);
    return { userId, token, userRole };
  }

  /**
   * Check if logged user is an admin
   * @returns 
   */
  isAdmin(): boolean{
    const { userRole } = this.getCredentials();
    return this.isAuth() && userRole === "admin";
  }

  isAuth():boolean{
    const { userId, token } = this.getCredentials();
    return !!token && !!userId;
  }




} // export class AuthService


