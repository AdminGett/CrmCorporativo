import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { userRegisterAltaComponent } from './user-register-alta/user-register-alta.component';
import { deleteUsersComponent } from './user-register-baja/user-register-baja.component';
import { AddTokenInterceptor } from '../app/utilities/add-token.interceptor';
import { updateUsersComponent } from './user-register-modificar/user-register-modificar.component';
import { UpdatePanelComponent } from './update-panel/update-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PermissionPanelComponent } from './permission-panel/permission-panel.component';
import { AdminPermissionsComponent } from './admin-permissions/admin-permissions.component';
import { GerentePermissionsComponent } from './gerente-permissions/gerente-permissions.component';
import { VentasPermissionsComponent } from './ventas-permissions/ventas-permissions.component';
import { MarketingPermissionsComponent } from './marketing-permissions/marketing-permissions.component';
import { SoportePermissionsComponent } from './soporte-permissions/soporte-permissions.component';
import { AnalisisPermissionsComponent } from './analisis-permissions/analisis-permissions.component';
import { UsuarioPermissionsComponent } from './usuario-permissions/usuario-permissions.component';
import { UserCommentComponent } from './user-comment/user-comment.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
            UsuarioPermissionsComponent,
            UserCommentComponent,
        ],
        //CommonModule (Cuauh)
        imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule, CommonModule, FormsModule, ToastrModule.forRoot({
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
            { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
        ],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map