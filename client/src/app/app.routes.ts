import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: "", component: Landing },
  { path: "sign-in", loadComponent: () => import("./pages/sign-in/sign-in").then(m => m.SignIn) },
  { path: "sign-up", loadComponent: () => import("./pages/sign-up/sign-up").then(m => m.SignUp) },
  { path: "404", loadComponent: () => import("./pages/page404/page404").then(m => m.Page404) },
  {
    path: "app",
    canMatch: [authGuard],
    loadComponent: () => import("./pages/app-layout/app-layout").then(m => m.AppLayout),
    children: [
      { path: "home", loadComponent: () => import("./pages/home/home").then(m => m.Home) },
      { path: "beer/:id", loadComponent: () => import("./pages/beer/beer").then(m => m.Beer) },
      { path: "user", loadComponent: () => import("./pages/user/user").then(m => m.User) },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  },
  { path: '**', redirectTo: '404' }
];
