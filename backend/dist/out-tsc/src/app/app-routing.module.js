import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { userRegisterAltaComponent } from './user-register-alta/user-register-alta.component';
import { deleteUsersComponent } from './user-register-baja/user-register-baja.component';
import { updateUsersComponent } from './user-register-modificar/user-register-modificar.component';
import { UpdatePanelComponent } from './update-panel/update-panel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PermissionPanelComponent } from './permission-panel/permission-panel.component';
import { VentasPermissionsComponent } from './ventas-permissions/ventas-permissions.component';
const routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        component: HomeComponent
    },
    {
        path: 'AltaUsuario',
        component: userRegisterAltaComponent
    },
    {
        path: 'BajaUsuario',
        component: deleteUsersComponent
    },
    {
        path: 'ModificarUsuario',
        component: updateUsersComponent
    },
    {
        path: 'users/update/getUser/:userId',
        component: UpdatePanelComponent
    },
    {
        path: 'userProfile/:userId',
        component: UserProfileComponent
    },
    {
        path: 'd/:userId',
        component: PermissionPanelComponent
    },
    {
        path: 'j',
        component: VentasPermissionsComponent
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map