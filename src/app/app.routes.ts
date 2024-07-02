import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { loggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [loggedInGuard]
    },
    {
        path: 'signUp',
        component: SignUpComponent
    }
];
