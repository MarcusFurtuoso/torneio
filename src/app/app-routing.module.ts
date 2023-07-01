import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./layout/auth/auth.component";
import {HomeComponent} from "./layout/home/home.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import { TorneiosComponent } from './components/home/torneios/torneios.component';
import { InscricaoComponent } from './components/home/inscricao/inscricao.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthenticationGuard]
    children: [
      { path: '', redirectTo: 'torneios', pathMatch: 'full' },
      {
        path: "torneios",
        component: TorneiosComponent
      },
      {
        path: "inscricao",
        component: InscricaoComponent
      }
    ]
  },



  // {
  //   path: '',
  //   component: AuthComponent,
  //   canActivate: [AuthenticatedGuard],
  //   children: [
  //     { path: '', redirectTo: 'login', pathMatch: 'full' },
  //     { path: 'login', component: LoginComponent },
  //     { path: 'register', component: RegisterComponent },
  //     { path: 'forgot-password', component: ForgotPasswordComponent },
  //     { path: 'reset-password', component: ResetPasswordComponent }
  //   ]
  // },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
