import { Routes } from '@angular/router';
import { Landing } from './components/pages/landing/landing';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "", component: Landing
    }, 
    {
        path: "home", canActivate: [authGuard], loadComponent: () => import("./components/pages/home/home").then(m => m.Home)
    },
    {
        path: "sign-in",  loadComponent: () => import("./components/pages/sign-in/sign-in").then(m => m.SignIn)
    },
    {
        path: "sign-up",  loadComponent: () => import("./components/pages/sign-up/sign-up").then(m => m.SignUp)
    }
];
