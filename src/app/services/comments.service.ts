import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { CommentModel, CommentResponse, Comment } from '../models/comment.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl: string = environment.api_url;
  private _comments: BehaviorSubject<CommentModel[]> = new BehaviorSubject<CommentModel[]>([]);
  comments$: Observable<CommentModel[]> = this._comments.asObservable();

  private _id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  id$: Observable<number> = this._id.asObservable();

  constructor(private http: HttpClient, private local: LocalStorageService) { }

  loadComments(id: number) {
    this._id.next(id);
    console.log("Cargando comentarios para el post:", id);
    
    this.http.get<CommentResponse>(`${this.apiUrl}/getComments.php?postId=${id}`).subscribe(response => {
      if (response.success) {
        const comments = response.comments.map(comment => new CommentModel(comment));
        this._comments.next(comments);
        console.log("Comentarios en servicio:", comments);
      } else {
        console.error("Error al cargar comentarios:", response.message);
      }
    });
  }

  sendComment( id: number, comment: Comment): Observable<CommentResponse> {
    const userId = this.local.getItem('IdUsuarioActivo');
    return this.http.post<CommentResponse>(`${this.apiUrl}/comments.php`, { postId: id, text: comment, userId: userId , action: 'add' });
  
  }

  deleteComment(id: number): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${this.apiUrl}/comments.php`, { commentId: id, action: 'delete' });
  }

}
