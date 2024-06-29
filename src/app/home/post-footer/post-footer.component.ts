import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { LikesService } from '../../likes.service';
import { LikeResponse } from '../../likes.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-post-footer',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent {
  constructor(
    private likesService: LikesService,
    private storage: LocalStorageService
  ) {}
  @Input()
  set data(value: any) {
    this._data = value;
    this.likes = value.likes;
    this.userLiked = value.user_like ? true : false;
  }
  private _data: any;

  get data(): any {
    return this._data;
  }
  userLiked: any;
  likes: any;

  @ViewChild('boton1') boton1?: ElementRef;

  usuario: string = this.storage.getItem('usuarioActivo');

  likesHandle() {
    if (!this.userLiked) {
      this.userLiked = true;
      console.log(this.userLiked);
      console.log(this.usuario);
      console.log(this.data.post_ID);

      console.log('like');

      this.likesService.postLike(this.data.post_ID, this.usuario).subscribe(
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

      this.likesService.deleteLike(this.data.post_ID, this.usuario).subscribe(
        (response: any) => {
          console.log('Se elimino el like correctamente', response);
          this.likes = response.likes;
          this.likesService.getLikes(this.data.post_ID).subscribe(
            (response: any) => {
              this.likes = response.likes;
            },
            (error) => {
              console.error('Error al obtener la cantidad de likes', error);
            }
          );
        },
        (error) => {
          console.error('Error al eliminar el like', error);
        }
      );
    }
  }

  // Método para calcular la diferencia de tiempo
  calcularDiferencia() {
    const fechaData = new Date(this.data.post_date);
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
