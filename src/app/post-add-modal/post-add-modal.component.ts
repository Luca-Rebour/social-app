import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MakePostsService } from '../../make-posts.service';
import { NgIf } from '@angular/common';
import { NgbConfig, NgbToast } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../toast.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-post-add-modal',
  standalone: true,
  imports: [FormsModule, NgIf, NgbToast],
  templateUrl: './post-add-modal.component.html',
  styleUrl: './post-add-modal.component.css',
})
export class PostAddModalComponent implements OnDestroy {
  constructor(private _makePostService: MakePostsService) {}

  toastService = inject(ToastService);

  showStandard(template: TemplateRef<any>) {
    this.toastService.show({ template });
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  post: string = '';
  error: boolean = false;
  showToast: boolean = false;
  publishPost() {
    this._makePostService.makePost(this.post).subscribe(
      (response) => {
        console.log('Post creado con exito', response);
        this.post = '';
        this.error = false;
        this.showToast = true;
      },
      (error) => {
        this.error = true;
        console.error('Login error', error);
      }
    );
  }
}
