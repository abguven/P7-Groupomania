import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, switchMap, Subject } from 'rxjs';
import { map,tap } from "rxjs/operators";
import { Post } from 'src/app/shared/models/Post.model';
import { PostWithUserInfo } from "src/app/shared/models/PostWithUserInfo.model";
import { User } from 'src/app/shared/models/User.model';
import { baseUrl } from "../../../environments/environment";

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
    return this.http.post<Post>(`${baseUrl}/posts`, formData);
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

    return this.http.put(`${baseUrl}/posts/${postId}`, formData);

  }

  getPosts():Observable<PostWithUserInfo[]>{
    return this.http.get<PostWithUserInfo[]>(`${baseUrl}/posts`).pipe(
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
      })
    )
  } // getPosts()



  getPostById(postId:string):Observable<Post>{
    return this.http.get<Post>(`${baseUrl}/posts/${postId}`);
  }

  likePost(postId:string, like: 0|1){
    return this.http.post(`${baseUrl}/posts/${postId}/like`, { like })
  }

  deletePost(postId:string){
    return this.http.delete(`${baseUrl}/posts/${postId}`);
  }

} // export class PostService
