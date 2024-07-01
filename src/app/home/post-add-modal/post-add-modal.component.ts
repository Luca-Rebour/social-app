import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MakePostsService } from '../../make-posts.service';
import { NgIf } from '@angular/common';

interface Toast {
  title: string;
  subtitle?: string;
  message: string;
  show: boolean;
}

@Component({
  selector: 'app-post-add-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './post-add-modal.component.html',
  styleUrl: './post-add-modal.component.css'
})
export class PostAddModalComponent {
  constructor(private _makePostService: MakePostsService) { }


  toasts: Toast[] = [];
  toast?: Toast;

  ngOnInit(): void {
  }
  mensajeToast: string = 'Se ha publicado tu post correctamente';
  showToast() {
    setTimeout(() => this.hideToast(), 5000); // Ocultar el toast después de 5 segundos
  }

  hideToast(toast: Toast) {
    toast.show = false;
    setTimeout(() => this.toasts = this.toasts.filter(t => t !== toast), 300); // Remover el toast después de la animación
  }






  post:string = '';
  error:boolean = false;
  publishPost(){
    this._makePostService.makePost(this.post)
    .subscribe(
      (response) => {
        console.log('Post creado con exito', response); 
        this.post = '';
        this.error = false;     
      },
      (error) => {
        this.error = true;
        console.error('Login error', error);
      }
    );
  }
  

}
