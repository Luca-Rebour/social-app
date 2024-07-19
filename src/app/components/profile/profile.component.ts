import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { getPostsService } from '../../services/get-posts.service';
import { HitPostModel } from '../../models/hitPost.model';
import { NgFor } from '@angular/common';
import { ConnectComponent } from './connect/connect.component';
import { FormsModule } from '@angular/forms';
import { EditCredentialsService } from '../../services/edit-credentials.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, NgFor, ConnectComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private local: LocalStorageService, private _postsService: getPostsService, private _edit: EditCredentialsService ) {
    this.name = this.local.getItem('nombreUsuarioActivo') || '';
    this.lastName = this.local.getItem('apellidoUsuarioActivo') || '';
    this.username = this.local.getItem('usernameActivo') || '';
    this.biography = this.local.getItem('biografiaUsuarioActivo') || '';
    this.biographyEdit = this.biography; // Inicializamos biographyEdit con el valor actual de biography
    this._postsService.getHitPosts(this.local.getItem('IdUsuarioActivo') || '').subscribe((posts) => {
      console.log('posts', posts);
      this.hitPosts = posts;
    });
  }

  usernameEdit: string = '';
  passEdit: string = '';
  passEdit2: string = '';
  currentPass: string = '';
  biographyEdit: string = '';

  name: string = '';
  biography: string;
  lastName: string = '';
  username: string = '';
  hitPosts: HitPostModel[] = [];

  edit() {
    
    if (this.usernameEdit === '' && this.passEdit === '' && this.passEdit2 === '' && this.currentPass === '' && this.biographyEdit === this.local.getItem('biografiaUsuarioActivo')) {
      console.log('No hay cambios');
      return;
    }

    if (this.passEdit !== '' && this.passEdit2 !== '' && this.currentPass !== '') {
        // Cambiar contraseña
      this._edit.editPassword(this.currentPass, this.passEdit, this.passEdit2).subscribe((response) => {
          console.log('response', response);
      });}


    if (this.usernameEdit !== '' && this.usernameEdit !== this.local.getItem('usernameActivo')) {
        // Solo cambiar nombre de usuario
      console.log('Cambiar nombre de usuario');
      this._edit.editUsername(this.usernameEdit).subscribe((response) => {
          console.log('response', response);
          this.local.setItem('usernameActivo', this.usernameEdit);
          this.username = this.local.getItem('usernameActivo') || '';
      });
    }

    if (this.biographyEdit !== this.local.getItem('biografiaUsuarioActivo')) {
      console.log('Cambiar biografía');
      // Cambiar biografía
      this._edit.editBiography(this.biographyEdit).subscribe((response) => {
        console.log('response', response);
        this.local.setItem('biografiaUsuarioActivo', this.biographyEdit);
        this.biography = this.biographyEdit; // Actualizar la biografía mostrada
      });
    }
  }




    

  closeForm() {
    console.log('close');
    this.usernameEdit = '';
    this.passEdit = '';
    this.passEdit2 = '';
    this.currentPass = '';
    this.biographyEdit = this.local.getItem('biografiaUsuarioActivo') || '';
  }
}