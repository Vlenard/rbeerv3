import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private authService = inject(Auth);
  private router = inject(Router);

  isLoading = false;

  signInForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
  });

  onSubmit() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.signInForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['app']);
        },
        error: (err) => {
          this.isLoading = false;
          this.signInForm.setErrors({ invalidCredentials: true });
        }
      });
    }
  }
}
