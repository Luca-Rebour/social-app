import { animation } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-footer',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css'
})
export class PostFooterComponent {

  @Input() data: any;

  @ViewChild('boton1') boton1?: ElementRef;

  estilo = {
    'display': 'none',
    'fill': 'red',
    'animation': 'none'
  };
  estilo2 = {
    'display': 'inline'
  };

  toggleLike() {
    this.boton1?.nativeElement.classList.toggle('like');
    this.estilo['display'] = this.estilo['display'] === 'none' ? 'inline' : 'none';
    this.estilo2['display'] = this.estilo2['display'] === 'none' ? 'inline' : 'none';
    console.log("like");
    setTimeout(() => {
      this.boton1?.nativeElement.classList.remove('like');
    }, 2000);
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
