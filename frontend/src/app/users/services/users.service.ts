import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/shared/models/User.model';
import { catchError, throwError,tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    // External services
    private http: HttpClient,
  ) { }

  /**
   * Sends a request to backend for creating a new user
   * @returns Observable
   */
  createUser(user: User, avatar: File) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("user_name", user.user_name);
    formData.append("last_name", user.last_name);
    return this.http.post<{ user: User }> 
      (`${environment.baseUrl}/users`, formData).pipe(
        catchError(error => throwError(() => error.error.error)) 
      );
  }


  /**
   * Sends a request to backend to update user profile
   * @returns Observable
   */
  modifiyUser(user: User, avatar: File | string, ignorePassword: boolean, resetAvatar = false) {
    const formData = new FormData();
    if ( typeof avatar !== "string"){
      formData.append("avatar", avatar);
    }
    formData.append("email", user.email);
    
    if (resetAvatar){
      formData.append("resetAvatar", "TRUE");
    }

    if (!ignorePassword){
      formData.append("password", user.password);
    }else{
      formData.append("ignorePassword", "TRUE");
    }
    formData.append("user_name", user.user_name);
    formData.append("last_name", user.last_name);
    return this.http.put(`${environment.baseUrl}/users/` +
            user.uuid, formData).pipe(
              catchError(error => throwError(() => error.error.error))
            );
  } // modifiyUser(user: User, avatar: File | string)


  /**
 * Sends a request to backend to update user profile
 * @returns Observable
 */
  getUserById(id:string) {
    return this.http.get<User>(`${environment.baseUrl}/users/` + id).pipe(
      catchError(error => throwError(() => error.error.error))
    );
  } // getUserById(user: User, avatar: File | string)


} // export class UsersService
