import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { PostService } from '../../services/post.service';
import { PostWithUserInfo } from 'src/app/shared/models/PostWithUserInfo.model';
import { AuthService } from '../../../auth/services/auth.service';


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
    this.loggedUserId = this.auth.getCredentials().userId;
    this.loading = false;
  }

  onDeleteAction(postId: string){
    this.postService.deletePost(postId).pipe(
      tap(() => {
         this.onRefresh();
      }),
      catchError( error => {
        this.errorMessage = error;
        return EMPTY;
      } )
    )
    .subscribe()
  }

  /**
   * Reload current page
   */
  onRefresh(){
    location.reload();
  }


}
