import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private authService = inject(Auth);
  private router = inject(Router);

  passwordMismatch = false;
  signUpForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmPassword: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { email, name, password, confirmPassword } = this.signUpForm.getRawValue();
    if (password !== confirmPassword) {
      this.signUpForm.setErrors({ passwordMismatch: true });
      return;
    }

    this.authService.signUp({ email, name, password }).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.signUpForm.setErrors({ server: err.error.message });
      },
    });
  }
}
