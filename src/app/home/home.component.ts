import { Component, Directive, ElementRef, EventEmitter, Output  } from '@angular/core';
import { PostCardComponent } from './post-card/post-card.component';
import { getPostsService } from '../get-posts.service';
import { KeyValuePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgFor, KeyValuePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  posts?: any;

  constructor(private getPostsService: getPostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.getPostsService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
      
    });
  }

  getSpecificPost(postId: any) {

  } 



}
