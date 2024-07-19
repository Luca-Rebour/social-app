import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class EditCredentialsService {
  constructor(private http: HttpClient, private local: LocalStorageService) {}

  private apiUrl: string = environment.api_url;

  editCredentials(
    username: string,
    currentPass: string,
    newPass1: string,
    newPass2: string
  ): Observable<any> {
    const userId = this.local.getItem('IdUsuarioActivo') || '';
    if (newPass1 !== newPass2) {
      return throwError('Las contraseñas no coinciden');
    }

    return this.http
      .post(`${this.apiUrl}/editCredentials.php`, {
        userId: userId,
        username: username,
        newPass: newPass1,
        action: 'all',
      })
      .pipe(catchError(this.handleError));
  }

  editUsername(username: string): Observable<any> {
    const userId = this.local.getItem('IdUsuarioActivo') || '';

    return this.http
      .post(`${this.apiUrl}/editCredentials.php`, {
        userId: userId,
        username: username,
        action: 'username',
      })
      .pipe(catchError(this.handleError));
  }

  editPassword(
    currentPass: string,
    newPass1: string,
    newPass2: string
  ): Observable<any> {
    if (newPass1 !== newPass2) {
      return throwError('Las contraseñas no coinciden');
    }

    const userId = this.local.getItem('IdUsuarioActivo') || '';

    return this.verifyPassword(currentPass).pipe(
      switchMap((response) => {
        if (response === '0') {
          return throwError('Contraseña actual incorrecta');
        }

        return this.http.post(`${this.apiUrl}/editCredentials.php`, {
          userId: userId,
          newPass: newPass1,
          action: 'pass',
        });
      }),
      catchError(this.handleError)
    );
  }

  verifyPassword(password: string): Observable<any> {
    const userId = this.local.getItem('IdUsuarioActivo') || '';

    return this.http
      .post(`${this.apiUrl}/editCredentials.php`, {
        userId: userId,
        password: password,
        action: 'verify',
      })
      .pipe(catchError(this.handleError));
  }

  editBiography(biography: string): Observable<any> {
    const userId = this.local.getItem('IdUsuarioActivo') || '';
    console.log("biografiaaaaaaaa" +biography);
    

    return this.http
      .post(`${this.apiUrl}/editCredentials.php`, {
        userId: userId,
        biography: biography,
        action: 'biography',
      })
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
