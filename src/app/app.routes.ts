import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path:"", component: RegisterComponent },
    { path:"login", component: LoginComponent},
    { path: "forgot-password", component: ForgotPasswordComponent},
    { path:"home", component: HomeComponent}
];
