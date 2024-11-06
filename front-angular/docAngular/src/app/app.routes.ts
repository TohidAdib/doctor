import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogoutComponent } from './logout/logout.component';
import { TakeVisitFormComponent } from './take-visit-form/take-visit-form.component';
import { TakevisitshowComponent } from './takevisitshow/takevisitshow.component';
import { TakevisitedshowComponent } from './takevisitedshow/takevisitedshow.component';
import { AdminComponent } from './admin/admin.component';

const getRoutes = (): Routes => {
  const token = localStorage.getItem('token');

  const tokenExistRoutes: Routes = [
    { path: 'register/logout', component: LogoutComponent },
    { path: 'takevisit', component: TakeVisitFormComponent },
    { path: 'takevisitshow', component: TakevisitshowComponent },
    { path: 'takevisitedshow', component: TakevisitedshowComponent },
    { path: 'admin', component: AdminComponent },
  ];

  const tokenNotExistRoute = [
    { path: 'register', component: RegisterComponent },
    { path: 'register/login', component: LoginComponent },
    { path: 'register/signin', component: SignInComponent },
  ];

  return [
    { path: '', component: MainComponent },
    ...(token ? tokenExistRoutes : tokenNotExistRoute),
  ];
};

export const routes: Routes = getRoutes();
