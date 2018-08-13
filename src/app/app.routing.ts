import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './authenticate/login/login.component';
import { DashboardComponent } from './application/application.component';
import { RegisterComponent } from './authenticate/register/register.component';
import { PublicComponent } from './public/public.component';
import { OneComponent } from './public/one/one.component';
import { TwoComponent } from './public/two/two.component';

const appRoutes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', component: OneComponent },
    { path: 'dos', component: TwoComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
