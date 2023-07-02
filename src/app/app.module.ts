import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


// components app
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HomeComponent } from './layout/home/home.component';

// components primeng
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog'
import {DropdownModule} from 'primeng/dropdown'
import { TorneiosComponent } from './components/home/torneios/torneios.component';
import { InscricaoComponent } from './components/home/inscricao/inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    TorneiosComponent,
    InscricaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,

    // components
    InputTextModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    MenuModule,
    DialogModule,
    DropdownModule
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
