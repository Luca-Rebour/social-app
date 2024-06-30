import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LikesService } from '../../likes.service';
import { LikeResponse } from '../../likes.service';
import { LocalStorageService } from '../../local-storage.service';
import { CommentsService } from '../../comments.service';


@Component({
  selector: 'app-post-footer',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent implements OnInit{
  @Input() data: any;
  likes: number = 0;
  userLiked: boolean = false;
  IdUsuarioActivo: number = 0;
  ActiveUserId: number = 0;
  ngOnInit(): void {
       this.likes = this.data.likeCount;
        this.userLiked = this.data.userLiked;
        this.ActiveUserId = this.storage.getItem('IdUsuarioActivo');
  }


  @ViewChild('boton1') boton1?: ElementRef;

  constructor(
    private likesService: LikesService,
    private storage: LocalStorageService,
    private commentsService: CommentsService
  ) {}



  likesHandle() {
    if (!this.userLiked) {
      this.userLiked = true;
      console.log(this.userLiked);
      console.log(this.data.postId);
      console.log("Usuario Activo " + this.ActiveUserId);

      console.log('like');

      this.likesService.postLike(this.data.postId, this.ActiveUserId).subscribe(
        (response: LikeResponse) => {
          console.log('Like successful', response);
          this.likes = response.likes;
        },
        (error) => {
          console.error('Like error', error);
        }
      );
    } else {
      this.userLiked = false;
      console.log(this.userLiked);
      console.log('Remove like');

      this.likesService.deleteLike(this.data.postId, this.ActiveUserId).subscribe(
        (response: any) => {
          console.log('Se elimino el like correctamente', response);
          this.likes = response.likes;
        },
        (error) => {
          console.error('Error al eliminar el like', error);
        }
      );
    }
  }
  
  verComentarios() {
   console.log('Ver comentarios');
   this.commentsService.loadComments(JSON.parse(this.data.postId));
    console.log(this.data.postId);
    
  }


  // Método para calcular la diferencia de tiempo
  calcularDiferencia() {
    const fechaData = new Date(this.data.postDate);
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos
    const diferencia = fechaActual.getTime() - fechaData.getTime();

    // Convertir la diferencia en diferentes unidades de tiempo
    const minutos = diferencia / (1000 * 60);
    const horas = minutos / 60;
    const dias = horas / 24;
    const semanas = dias / 7;
    const meses = dias / 30; // Aproximación
    const años = meses / 12;

    // Determinar el rango de tiempo y retornar el valor correspondiente
    if (años >= 1) {
      return `${Math.floor(años)} año(s)`;
    } else if (meses >= 1) {
      return `${Math.floor(meses)} mes(es)`;
    } else if (semanas >= 1) {
      return `${Math.floor(semanas)} semana(s)`;
    } else if (dias >= 1) {
      return `${Math.floor(dias)} día(s)`;
    } else if (horas >= 1) {
      return `${Math.floor(horas)} hora(s)`;
    } else {
      return `${Math.floor(minutos)} minuto(s)`;
    }
  }
}
