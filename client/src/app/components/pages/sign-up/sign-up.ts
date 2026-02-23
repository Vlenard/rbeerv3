import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  private auth = inject(AuthService);

  signUpGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  onSubmit(){
    console.log("asd");
  }
}
