import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { environment } from './../environment/environment';
import { Post, PostModel, PostsResponse } from './../models/post.model';


interface comments {
  commentId: number;
  commentDate: string;
  commentText: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})

export class getPostsService {

  usuarioActivo: string = ' ';
  private apiUrl:string = environment.api_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private local: LocalStorageService
  ) {}

getPosts(): Observable<PostModel[]> {
  this.usuarioActivo = encodeURIComponent(this.local.getItem('IdUsuarioActivo') || '');
  console.log('usuarioActivo', this.usuarioActivo); 

  return this.http
    .post<PostsResponse>(`${this.apiUrl}/getPosts.php`, { userId: this.usuarioActivo })
    .pipe(
      map(response => response.posts.map(post => new PostModel(post))),
      catchError(this.handleError)
    );
}
  




  handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred.';
    if (error) {
      errorMessage = error.message ? error.message : errorMessage;
    }
    console.error(errorMessage);
    // Optionally, navigate to an error page or show an error message to the user.
    // this.router.navigate(['/error']);
    return throwError(() => new Error(errorMessage));
  }
}
