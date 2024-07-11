import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
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
