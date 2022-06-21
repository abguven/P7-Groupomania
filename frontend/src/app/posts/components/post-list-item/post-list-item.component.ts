import { Component, Input, OnInit, Output } from '@angular/core';
import { PostWithUserInfo } from 'src/app/shared/models/PostWithUserInfo.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  errorMessage!: string;
  @Input() liked!: boolean;
  @Input() post!: PostWithUserInfo;
  @Input() loggedUserId!: string;
  @Input() isAdmin!: boolean;
  @Output() likeAction = new EventEmitter<{ postId: string, like: 0|1 }>();
  @Output() deleteAction = new EventEmitter<string>();
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.liked = this.post.usersLiked.includes(this.loggedUserId);
  }

  onLikeAction(){
    this.likeAction.emit({ postId: this.post.uuid, like: this.liked ? 0 : 1 });
  }

  onModifyPost(postId:string){
    this.router.navigateByUrl(`posts/modify-post/${postId}`);
  }

  onDeletePost(){
    if (confirm(`Êtes-vous sur de supprimer la publication?`)){
      this.deleteAction.emit(this.post.uuid);
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


