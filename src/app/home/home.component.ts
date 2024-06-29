import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { PostCardComponent } from './post-card/post-card.component';
import { getPostsService } from '../get-posts.service';
import { CommentsService } from '../comments.service';
import { Post, PostModel } from '../models/post.model';
import { KeyValuePipe, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { Comment } from '../comments.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgFor, KeyValuePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('commentInput') commentInput!: ElementRef;
  @ViewChild('modalRef') modalRef!: ElementRef;

  posts?: PostModel[];
  comments: Comment[] = [];
  private commentsSubscription: Subscription = new Subscription();

  constructor(
    private getPostsService: getPostsService,
    private commentsService: CommentsService
  ) {
    this.getPosts();
  }

  ngOnInit(): void {
    this.commentsService.comments$.subscribe((comments) => {
      this.comments = comments || [];
    });
  }

  ngAfterViewInit(): void {
    this.modalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      // Aquí va el código a disparar en el evento
      console.log('Modal cerrado');
      this.commentInput.nativeElement.value = '';
    });
  }

  ngOnDestroy() {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

  getPosts(): PostModel[] {
    this.getPostsService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
    });
    return this.posts || [];
  }
}
