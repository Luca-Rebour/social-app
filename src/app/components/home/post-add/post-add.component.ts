import { Component, ViewChild, inject, OnDestroy, TemplateRef } from '@angular/core';
import { MakePostsService } from '../../../services/make-posts.service';
import { ToastService } from '../../../services/toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet, FormsModule],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.css'
})
export class PostAddComponent implements OnDestroy {

  constructor(private _makePostService: MakePostsService) {}

  toastService = inject(ToastService);
  @ViewChild('successTpl', { static: true }) successTpl!: TemplateRef<any>
  @ViewChild('errorTpl', { static: true }) errorTpl!: TemplateRef<any>
  @ViewChild('emptyTpl', { static: true }) emptyTpl!: TemplateRef<any>


	showSuccess(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
	}

  showDanger(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000 });
	}


	ngOnDestroy(): void {
		this.toastService.clear();
	}

  post: string = '';
  error: boolean = false;
  publish(){
    console.log('Post publicado', this.post);
    
    if(this.post.length == 0){
      this.showDanger(this.emptyTpl);
      return;
    }

    this._makePostService.makePost(this.post).subscribe((response) => {
      console.log('Post successful', response);
      this.showSuccess(this.successTpl);
      this.post = '';
    },
    (error) => {
      this.error = true;
      console.error('Login error', error);
      this.showDanger(this.errorTpl);
      
    }
  );
  

  }
}
