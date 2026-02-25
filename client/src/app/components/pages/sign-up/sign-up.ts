import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  auth = inject(AuthService);
  private router = inject(Router);

  signUpGroup = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    name: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  get email() {
    return this.signUpGroup.controls.email
  }

  get name() {
    return this.signUpGroup.controls.name
  }

  get password() {
    return this.signUpGroup.controls.password
  }

  onSubmit() {
    if (this.signUpGroup.invalid) return;

    const { email, name, password } = this.signUpGroup.getRawValue();

    this.auth.signUp(email, name, password)
      .then(() => this.router.navigate(["/home"]))
      .catch(() => console.log("Faild to sign up"));
  }
}
