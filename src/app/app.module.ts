import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './workload/home/home.component';
import { userRegisterAltaComponent } from './users/user-register-alta/user-register-alta.component';
import { deleteUsersComponent } from './users/user-register-baja/user-register-baja.component';
import { AddTokenInterceptor } from './utilities/add-token.interceptor';
import { updateUsersComponent } from './users/user-register-modificar/user-register-modificar.component';
import { UpdatePanelComponent } from './users/update-panel/update-panel.component';
import { NavbarComponent } from './users/navbar/navbar.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { PermissionPanelComponent } from './users/permission-panel/permission-panel.component';
import { AdminPermissionsComponent } from './users/admin-permissions/admin-permissions.component';
import { GerentePermissionsComponent } from './users/gerente-permissions/gerente-permissions.component';
import { VentasPermissionsComponent } from './users/ventas-permissions/ventas-permissions.component';
import { MarketingPermissionsComponent } from './users/marketing-permissions/marketing-permissions.component';
import { SoportePermissionsComponent } from './users/soporte-permissions/soporte-permissions.component';
import { AnalisisPermissionsComponent } from './users/analisis-permissions/analisis-permissions.component';
import { UsuarioPermissionsComponent } from './users/usuario-permissions/usuario-permissions.component';
import { AddInterceptorRefresh } from './utilities/authRefresh.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    userRegisterAltaComponent,
    deleteUsersComponent,
    updateUsersComponent,
    UpdatePanelComponent,
    NavbarComponent,
    UserProfileComponent,
    PermissionPanelComponent,
    AdminPermissionsComponent,
    GerentePermissionsComponent,
    VentasPermissionsComponent,
    MarketingPermissionsComponent,
    SoportePermissionsComponent,
    AnalisisPermissionsComponent,
    UsuarioPermissionsComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule, ToastrModule.forRoot({
    positionClass: 'toast-bottom-right',
    timeOut: 3000,
    preventDuplicates: true
  }), CommonModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddInterceptorRefresh,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
