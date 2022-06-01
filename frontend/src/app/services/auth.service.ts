import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Credentials } from "../models/Credential.model";

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
          console.log("%c userId", "color: orange" , credentials.userId);
          this.setCredentials(credentials);
          this.isAuth$.next(true); // ??????????????????????????????????
        })
      );
  } // loginUser(email: string, password: string)

  
  logout(){
    this.setCredentials({ token:"", userId:"" });
    this.isAuth$.next(false);
    this.router.navigate(["login"]);
  } // logout()  
  
  
  setCredentials( credentials: Credentials){
    this.cookies.set("token", credentials.token);
    this.cookies.set("userId", credentials.userId);
  }

  getCredentials():Credentials{
    const token = this.cookies.get("token");
    const userId = this.cookies.get("userId");

    console.log("%c userId", "color: yellow" , userId);

    return { userId, token };
  }




} // export class AuthService


