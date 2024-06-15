import { Component, Directive, ElementRef, EventEmitter, Output  } from '@angular/core';
import { PostCardComponent } from './post-card/post-card.component';
import { ComunicacionServerService } from '../comunicacion-server.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  posts?: any;

  constructor(private comunicacionServerService: ComunicacionServerService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.comunicacionServerService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
      
    });
  }

  getSpecificPost(postId: any) {

  } 



}
