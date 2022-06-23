import { Injectable } from '@angular/core';
import { EMPTY, Observable, ObservableInput, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getCredentials().token;
    const newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    })
    return next.handle(newRequest).pipe(
      catchError( (error: HttpErrorResponse) => {
        // If token is expired, unlog the user
        if (error.status == 401 && error.error.error === "jwt expired"){
          this.auth.logout();
        }
        return throwError(() => error)
      })
    )




  }
} // export class AuthInterceptor
