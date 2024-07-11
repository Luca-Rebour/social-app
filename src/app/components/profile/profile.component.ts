import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { getPostsService } from '../../services/get-posts.service';
import { HitPostModel } from '../../models/hitPost.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private local: LocalStorageService, private postsService: getPostsService ) {
    this.name = this.local.getItem('nombreUsuarioActivo') || '';
    this.lastName = this.local.getItem('apellidoUsuarioActivo') || '';
    this.postsService.getHitPosts(this.local.getItem('IdUsuarioActivo') || '').subscribe((posts) => {
      console.log('posts', posts);
      
      this.hitPosts = posts;
    });

    console.log('hitPosts', this.hitPosts);
    

   }

  name: string = 'John Doe';
  lastName: string = '';
  hitPosts: HitPostModel[] = [];

}
