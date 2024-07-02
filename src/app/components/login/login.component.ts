import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { LikesService } from '../../services/likes.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private login: LoginService, private router: Router, private likesService: LikesService, private local: LocalStorageService) {}

  user? : string;
  password? : string;
  credencialesInvalidas = false;

  onSubmit() {
    console.log('Login', this.user, this.password);
    
    this.login.login(this.user || "", this.password || "")
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
          this.local.setItem('IdUsuarioActivo', response.userId || '');
          console.log('IdUsuarioActivo', response.userId);
          
        },
        (error) => {
          console.error('Login error', error);
          if (error === 401) {
            this.credencialesInvalidas = true;
          }
        }
      );
  }
    
}
