import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path:"", component: AuthComponent, pathMatch: 'full' },
    { path:"home", component: HomeComponent}
];
