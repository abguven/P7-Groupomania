import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { PostService } from '../../services/post.service';
import { PostWithUserInfo } from 'src/app/shared/models/PostWithUserInfo.model';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/shared/models/Credential.model';



@Component({
  selector: 'app-post-list',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<PostWithUserInfo[]>;
  isAdmin!: boolean;
  loading!: boolean;
  loggedUserId!: string;
  errorMessage!: string;

  constructor(private postService: PostService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
    this.isAdmin = this.auth.isAdmin();
    this.loggedUserId = this.getCredentials().userId;
    this.loading = false;
  }

  onLikeAction( likeAction: { postId:string, like: 0|1 } ){
    this.loading = true;
    this.postService.likePost( likeAction.postId, likeAction.like ).pipe(
      tap(() => {
        this.loading = false;
        this.onRefresh();
      }),
      catchError(error => {
        this.loading = false;
        this.errorMessage = error;
        return EMPTY;
      })
    ).subscribe();
  }

  onDeleteAction(postId: string){
    this.loading = true;
    this.postService.deletePost(postId).pipe(
      tap(() => {
        this.loading = false;
        this.onRefresh();
      }),
      catchError( error => {
        this.loading = false;
        this.errorMessage = error;
        return EMPTY;
      } )
    )
    .subscribe()
  }

  onRefresh(){
    location.reload();
  }

  getCredentials():Credentials{
    return this.auth.getCredentials();
  }




}
