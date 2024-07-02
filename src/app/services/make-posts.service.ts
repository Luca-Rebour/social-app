import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class MakePostsService {
  constructor(private http: HttpClient, private local: LocalStorageService) {}
  activeUser: any = this.local.getItem('IdUsuarioActivo');

  apiUrl: string = environment.api_url;
  makePost(post: string): Observable<any> {
    console.log('usuario Activo', this.activeUser);

    console.log('Post publicado' + post);
    return this.http
      .post(`${this.apiUrl}/makePost.php`, {
        post: post,
        user: this.activeUser,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
    }
    return throwError(error.status);
  }
}
