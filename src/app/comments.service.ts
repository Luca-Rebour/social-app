import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Comment {
  comment_id: number;
  comment_date: string;
  comment_text: string;
  comment_user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  comments$: Observable<Comment[]> = this._comments.asObservable();

  constructor() { }

  updateComments(comments: any) {
    this._comments.next(comments);
  }
}
