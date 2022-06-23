import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/shared/models/Post.model';
import { PostService } from '../../services/post.service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() refresh = new EventEmitter<true>();

  postForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private postService: PostService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.fb.group(({
      content: [null,[Validators.required, Validators.minLength(10)]],
      postImage:[null]
    }))
  }

  onFileAdded(event: Event){ 
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get("postImage")?.setValue(file);
    this.postForm.updateValueAndValidity();
  } // onFileAdded(event: Event)

  onSubmit(){
    const newPost = new Post();
    newPost.content = this.postForm.get("content")?.value;
    // newPost.user_uuid = this.auth.getCredentials().userId;  ***** TODO DELETE, No need to add userid, backend already does this ***** 
    this.postService.addNewPost(newPost, this.postForm.get("postImage")?.value).pipe(
      tap((post)=>{
        this.postForm.reset();
        this.refresh.emit(true);      
      }),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe();
  }

}
