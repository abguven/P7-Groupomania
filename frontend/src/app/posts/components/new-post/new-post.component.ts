import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from "rxjs/operators";
import { Post } from 'src/app/shared/models/Post.model';
import { PostService } from '../../services/post.service';
import { catchError, EMPTY, Observable, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() refresh = new EventEmitter<true>();

  loading = false;
  errorMessage!: string;
  postForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private postService: PostService
              ) { }

  ngOnInit(): void {
    this.errorMessage = "";
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

  
  onSubmit() {
    const newPost = new Post();
    newPost.content = this.postForm.get("content")?.value;
    this.loading = true;
    // No need to add userid, backend already does this
    this.postService.addNewPost(newPost, this.postForm.get("postImage")?.value).pipe(
      tap(() => {
        this.loading = false;
        this.postForm.reset();
        this.refresh.emit(true); // Emit refresh signal to the parent     
      }),
      catchError(error => {
        this.loading = false;
        this.errorMessage = error;
        return EMPTY;
      })
    ).subscribe();
  }

}
