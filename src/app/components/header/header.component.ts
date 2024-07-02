import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private local: LocalStorageService) { }

  logout() {
    this.local.removeItem('IdUsuarioActivo');
    this.local.removeItem('UsuarioActivo');
    window.location.reload();
  }

}
