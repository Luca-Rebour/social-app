import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';

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

  private apiUrl: string = environment.api_url;

  constructor(private http: HttpClient) {}

  postLike(postId: number, userId: number): Observable<any> {
    console.log('postId', postId);
    console.log('user', userId);
    

    return this.http
      .post(`${this.apiUrl}/likePost.php`, { postId, userId, action : 'like'})
      .pipe(catchError(this.handleError));
  }

  deleteLike(postId: number, userId: number): Observable<any> {
    console.log('postId', postId);
    
    return this.http.post(
      `${this.apiUrl}/likePost.php`,
      { postId, userId, action: 'unlike' }
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
