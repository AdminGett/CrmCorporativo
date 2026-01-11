import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        preventDuplicates: true
    }),CommonModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
