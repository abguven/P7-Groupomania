import { Component, Input, OnInit, Output } from '@angular/core';
import { PostWithUserInfo } from 'src/app/shared/models/PostWithUserInfo.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  errorMessage!: string;
  likeInProgress! :boolean;
  liked!: boolean;
  likes!: number;
  @Input() post!: PostWithUserInfo;
  @Input() loggedUserId!: string;
  @Input() isAdmin!: boolean;
  @Output() deleteRequest = new EventEmitter<string>();
  
  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.liked = this.post.usersLiked.includes(this.loggedUserId);
    this.likes = this.post.likes;
    this.likeInProgress = false;
  }

  onLikeAction(){
    this.likeInProgress = true;
    this.postService.likePost(this.post.uuid, this.liked ? 0 : 1).pipe(
      tap((likeResponse) => {
        this.liked = likeResponse.liked;
        this.likes = likeResponse.likes;
        this.likeInProgress = false;
      }),
      catchError(error => {
        this.likeInProgress = false;
        this.errorMessage = error;
        return EMPTY;
      })
    ).subscribe();
  }

  onModifyPost(postId:string){
    this.router.navigateByUrl(`posts/modify-post/${postId}`);
  }

  onDeletePost(){
    if (confirm(`Êtes-vous sur de supprimer la publication?`)){
      this.deleteRequest.emit(this.post.uuid);
    }
  }

  /**
   * Check if the user connected has priviledges to delete or modifiy the post
   * @param userId userId saved in post 
   * @returns true if logged user had priviledges to update the post
   */
  canUpdate(userId: string){
    return this.isAdmin || this.loggedUserId == userId;
  } // 


}


