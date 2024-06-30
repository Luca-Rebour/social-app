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
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Comment, CommentModel } from '../models/comment.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgFor, KeyValuePipe, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('commentInput') commentInput!: ElementRef;
  @ViewChild('modalRef') modalRef!: ElementRef;

  posts?: PostModel[];
  comments: CommentModel[] = [];
  id: number = 0;
  private commentsSubscription: Subscription = new Subscription();

  constructor(
    private getPostsService: getPostsService,
    private commentsService: CommentsService,
    private local: LocalStorageService
  ) {
    this.getPosts();
  }

  activeUser: number = this.local.getItem('IdUsuarioActivo');

  ngOnInit(): void {
    this.commentsService.comments$.subscribe(comments => {
      this.comments = comments;
    });
    this.commentsService.id$.subscribe(id => {
      this.id = id;
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

  sendComment(){
    const text = this.commentInput.nativeElement.value;
    if (text) {
      console.log("Enviando comentario:", text);
      this.commentsService.sendComment(this.id, text).subscribe(
        (response: any) => {
          console.log("Comentario enviado:", response);
          this.commentsService.loadComments(this.id);
        },
        (error) => {
          console.error("Error al enviar comentario:", error);
        }
      );
    }

  }

  deleteComment(comment: number) {
    console.log("Eliminando comentario:", comment);
    this.commentsService.deleteComment(comment).subscribe(
      (response: any) => {
        console.log("Comentario eliminado:", response);
        this.commentsService.loadComments(this.id);
      },
      (error) => {
        console.error("Error al eliminar comentario:", error);
      }
    );
  }
    
}
