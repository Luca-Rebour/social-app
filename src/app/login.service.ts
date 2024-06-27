import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.api_url;

  constructor(private http: HttpClient, private router: Router) { }
  

  login(mail: string, password: string): Observable<any> {
    const loginData = { mail, password };
    return this.http
      .post(`${this.apiUrl}/login.php`, loginData)
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
