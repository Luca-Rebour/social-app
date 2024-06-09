import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost/social-app-db';
  posts?: any;
  getPosts() {
    console.log(this.apiUrl);
    
    this.posts = this.http.get(this.apiUrl + '/getPosts.php');
    return this.posts;
  }
}
