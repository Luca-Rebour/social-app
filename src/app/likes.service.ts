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
  providedIn: 'root'
})
export class LikesService {

  usuarioActivo:string = ' ';

  private apiUrl = 'http://localhost/social-app-db';

  constructor(private http: HttpClient) { }

  postLike(postId: number): Observable<any> {
    console.log('postId', postId);
    
    return this.http
      .post(`${this.apiUrl}/likePost.php`, { postId })
      .pipe(catchError(this.handleError));
  }

  deleteLike(postId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/likePost.php?postId=${postId}&user=${this.usuarioActivo}`)
      .pipe(catchError(this.handleError));
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
