import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: "", component: Landing },
  { path: "home", canMatch: [authGuard], loadComponent: () => import("./pages/home/home").then(m => m.Home) },
  { path: "beer/:id", canMatch: [authGuard], loadComponent: () => import("./pages/beer/beer").then(m => m.Beer) },
  { path: "user", canMatch: [authGuard], loadComponent: () => import("./pages/user/user").then(m => m.User) },
  { path: "sign-in", loadComponent: () => import("./pages/sign-in/sign-in").then(m => m.SignIn) },
  { path: "sign-up", loadComponent: () => import("./pages/sign-up/sign-up").then(m => m.SignUp) },
];
