import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'sign-in',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {

  private router = inject(Router);

  auth = inject(AuthService);

  signInGroup = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  get email() {
    return this.signInGroup.controls.email;
  }

  get password() {
    return this.signInGroup.controls.password;
  }

  onSubmit() {

    if (this.signInGroup.invalid) return;

    const { email, password } = this.signInGroup.getRawValue();

    this.auth.signIn(email, password)
      .then(() => this.router.navigate(["/home"]));
  }
}
