import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
      if (this.authService.checkAutoSignIn()) {
        if (window.location.pathname === '/sign-in' || window.location.pathname === '/sign-up' || window.location.pathname === '/') {
          this.router.navigate(['/home']);
        }
      }
    }
}
