import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, map } from "rxjs/operators";
import { Post } from 'src/app/shared/models/Post.model';
import { PostWithUserInfo } from "src/app/shared/models/PostWithUserInfo.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUserWithInfo$!: Subject<PostWithUserInfo>;
  constructor(private http: HttpClient) { }

  addNewPost(post: Post, postImage: File):Observable<Post>{
    const formData = new FormData();
    // Don't need to add userId because backened does it
    formData.append("content", post.content);
    formData.append("postImage", postImage);
    return this.http.post<Post>(`${environment.baseUrl}/posts`, formData).pipe(
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    )
  }

  modifiyPost(post:Post, postImage:File|string, postId:string, resetPostImage:boolean=false){
    const formData = new FormData();
    formData.append("content", post.content);
    if (resetPostImage){
      formData.append("resetPostImage", "TRUE");
    }

    if (typeof postImage !== "string"){
      formData.append("postImage", postImage);
    }

    return this.http.put(`${environment.baseUrl}/posts/${postId}`, formData).pipe(
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    );

  }

  getPosts():Observable<PostWithUserInfo[]>{
    return this.http.get<PostWithUserInfo[]>(`${environment.baseUrl}/posts`).pipe(
      // Sort posts by update time
      map(posts => [...posts].sort((a: PostWithUserInfo, b: PostWithUserInfo) => { 
        const A = new Date(a.createdAt).getTime();
        const B = new Date(b.createdAt).getTime();
        return (B - A);
      })),
      map(posts => {
        for(const post of posts){
          post.usersLiked = post.PostLikes.map( item => item.UserUuid);
        }
        return posts;
      }),
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    )
  } // getPosts()



  getPostById(postId:string):Observable<Post>{
    return this.http.get<Post>(`${environment.baseUrl}/posts/${postId}`).pipe(
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    );
  }

  likePost(postId:string, like: 0|1){
    return this.http.post<{ postId:string, userId:string, liked:boolean, likes: number }>(`${environment.baseUrl}/posts/${postId}/like`, { like }).pipe(
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    )
  }

  deletePost(postId:string){
    return this.http.delete(`${environment.baseUrl}/posts/${postId}`).pipe(
      catchError(error => throwError(() => error.error.error)) // Get the error message from HttpErrorResponse
    );
  }

} // export class PostService
