import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getCredentials().token;
    const newRequest = req.clone({
      headers: req.headers.set("Authorization","Bearer " + authToken )
    }) 
    return next.handle(newRequest);
  }
} // export class AuthInterceptor
