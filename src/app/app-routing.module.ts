import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './workload/home/home.component';
import { userRegisterAltaComponent } from './users/user-register-alta/user-register-alta.component';
import { deleteUsersComponent } from './users/user-register-baja/user-register-baja.component';
import { updateUsersComponent } from './users/user-register-modificar/user-register-modificar.component';
import { UpdatePanelComponent } from './users/update-panel/update-panel.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { PermissionPanelComponent } from './users/permission-panel/permission-panel.component';
import { ErrorAccesoComponent } from './auth/error-acceso/error-acceso.component';
import { AuthGuard } from './utilities/auth.guard';

const routes: Routes = [
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
    component:ErrorAccesoComponent,
    path:'accessDenied'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
