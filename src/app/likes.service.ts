import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface LikeResponse {
  success: boolean;
  message: string;
  likes: number;
}

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  usuarioActivo: string = ' ';

  private apiUrl = 'http://localhost/social-app-db';

  constructor(private http: HttpClient) {}

  postLike(postId: number, user: string): Observable<any> {
    console.log('postId', postId);
    console.log('user', user);
    

    return this.http
      .post(`${this.apiUrl}/likePost.php`, { postId, user })
      .pipe(catchError(this.handleError));
  }

  deleteLike(postId: number, user: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/likePost.php`,
      { postId, user, delete: true }
    );
  }

  getLikes(postId: number): Observable<any> {
    console.log('se obtienen los likes del post', postId);
    
    return this.http.post(
      `${this.apiUrl}/likePost.php`,
      { postId, get: 'likes' }
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red.
      console.error('An error occurred:', error.error.message);
    } else {
      // El backend devolvió un código de respuesta fallido.
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
    }
    // Devuelve un observable con un mensaje de error para el usuario.
    return throwError(error.status);
  }
}
