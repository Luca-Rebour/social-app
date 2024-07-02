import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {


  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  dontMatch: boolean = false;


  onSubmit(){

    if(this.password !== this.repeatPassword){
      this.dontMatch = true;
      return;
    }

    console.log('Sign up', this.username, this.password);

  }
}
