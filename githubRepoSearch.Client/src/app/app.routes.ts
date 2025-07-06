import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SearchReposComponent } from './components/search-repos/search-repos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchReposComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' },
];
