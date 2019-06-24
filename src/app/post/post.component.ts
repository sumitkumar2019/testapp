import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts:any[];

  constructor(private postService:PostService) {
   }

   addPost(input: HTMLInputElement){
     let post ={title:input.value};
     input.value = '';
    this.postService.create(post).subscribe(result=>{
      post['id']=result.json().id;
      this.posts.splice(0,0,post);
      console.log(result.json());
    }, (error:AppError)=>{
      if(error instanceof BadRequestError){
        alert('Bad Request');
      }else{
        throw error;
      }
    });
   }

   updatePost(post){
      this.postService.update(post).subscribe(result=>result.json());
   }

   deletePost(post){
    this.postService.delete(post).subscribe(result=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);  
      console.log(result);
    }, (error:AppError)=>{
      if(error instanceof NotFoundError){
        alert('Resource not found');
      }else{
        throw error;
      }
    });
   }

  ngOnInit() {
    this.postService.getAll().subscribe(posts=> this.posts = posts );
  }

}