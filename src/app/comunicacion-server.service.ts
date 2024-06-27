import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../app/environment/environment';

interface Post {
  id: number;
  date: string;
  user: string;
  likes: number;
  comments: number;
}

@Injectable({
  providedIn: 'root',
})
export class ComunicacionServerService {
  usuarioActivo: string = ' ';
  private apiUrl:string = environment.api_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private local: LocalStorageService
  ) {}

getPosts(): Observable<Post[]> {
    let usuarioActivo = encodeURIComponent(this.local.getItem('usuarioActivo') || '');
    console.log('usuarioActivo', usuarioActivo); // Asegurarse de que el valor es el esperado

    return this.http
      .get<Post[]>(`${this.apiUrl}/getPosts.php?usuarioActivo=${usuarioActivo}`)
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
