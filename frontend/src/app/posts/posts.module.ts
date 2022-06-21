import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from "../posts/components/post-list/postlist.component";
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePostComponent } from './components/update-post/update-post.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent,
    NewPostComponent,
    UpdatePostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PostsModule { }
