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
import { ErrorAccesoComponent } from './error-acceso/error-acceso.component';
import { AuthGuard } from './utilities/auth.guard';
import { UserCommentComponent } from './user-comment/user-comment.component';
import { UserTaskComponent } from './user-task/user-task.component';
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
        component: userRegisterAltaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'BajaUsuario',
        component: deleteUsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ModificarUsuario',
        component: updateUsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/update/getUser/:userId',
        component: UpdatePanelComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'userProfile/:userId',
        component: UserProfileComponent
    },
    {
        component: PermissionPanelComponent,
        path: 'permissions/:userId',
        canActivate: [AuthGuard]
    },
    {
        component: ErrorAccesoComponent,
        path: 'accessDenied'
    },
    {
        component: UserTaskComponent,
        path: 'userTasks'
    },
    {
        component: UserCommentComponent,
        path: 'userTasks/:workloadId/comments'
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