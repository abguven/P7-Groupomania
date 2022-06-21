import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Post } from 'src/app/shared/models/Post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  postForm!: FormGroup;
  loading!: boolean;
  postId!: string;
  errorMessage!: string;
  postPreview!: string;
  resetPostImage = false;
  readonly defaultPostPreviewImage = "../../../assets/default-post-picture.png";

  constructor(
    private fb: FormBuilder,
    private postServices: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.postPreview = this.defaultPostPreviewImage;
    this.route.params.pipe(
      map(params => params["id"]),
      switchMap(id => this.postServices.getPostById(id)),
      tap( post => {
        if (post.post_image_url){
          this.postPreview = post.post_image_url;
        }else{
          this.defaultPostPreviewImage;
        }
        this.postId = post.uuid;
        this.postForm = this.fb.group(({
          title : [post.title, Validators.required],
          content: [post.content, Validators.required],
          postImage: [post.post_image_url]
        }));

        this.loading = false;
      }),
      catchError(error => this.errorMessage = JSON.stringify(error) )
    ).subscribe();


  } // ngOnInit()

  onFileAdded(event: Event){ 
    this.loading = true;
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get("postImage")?.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.postPreview = reader.result as string;
      this.resetPostImage = false;
      this.loading = false;
    }

    reader.onerror = () => {
      this.loading = false;
    }
    reader.readAsDataURL(file);
  } // onFileAdded(event: Event)



  onSubmit(){
    this.loading = true;
    const post = new Post();
    post.title = this.postForm.get("title")?.value;
    post.content = this.postForm.get("content")?.value;
    this.postServices.modifiyPost(post, this.postForm.get("postImage")?.value, this.postId, this.resetPostImage).pipe(
      tap( ()=> {
        this.loading = false;
        this.router.navigate(["/posts"]);
      }),
      catchError( error => {
        this.loading = false;
        this.errorMessage = error;
        return EMPTY;
      })
    ).subscribe();
  }

  onDeleteImage(){
    this.postForm.get("postImage")?.setValue(null);
    this.postForm.updateValueAndValidity();
    this.postPreview = this.defaultPostPreviewImage;
    this.resetPostImage = true;
  }

  onCancel(){
    this.postForm.reset();
    this.router.navigateByUrl("/");
  }



}
