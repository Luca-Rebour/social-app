import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.api_url;

  follow(followed: number){
    const follower = parseInt(localStorage.getItem('IdUsuarioActivo') || '0');
    console.log('Follow' + followed);
    return this.http
    .post(`${this.apiUrl}/follow.php`, { follower: follower, followed: followed, action : 'follow'})
    .pipe(catchError(this.handleError));
  }

  unfollow(followed: number){
    const follower = parseInt(localStorage.getItem('IdUsuarioActivo') || '0');
    console.log('Unfollow' + followed);
    return this.http
    .post(`${this.apiUrl}/follow.php`, { follower: follower, followed: followed, action : 'unfollow'})
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
  
}
