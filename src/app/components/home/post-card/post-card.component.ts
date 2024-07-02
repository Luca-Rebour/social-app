import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostFooterComponent } from '../post-footer/post-footer.component';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostComponent, PostFooterComponent, PostHeaderComponent, NgFor],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

  @Input() post: any;
  @Output() isVisible = new EventEmitter<boolean>();
  
    constructor() {}

}
