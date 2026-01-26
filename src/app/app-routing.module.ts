import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { userRegisterAltaComponent } from './user-register-alta/user-register-alta.component';
import { deleteUsersComponent } from './user-register-baja/user-register-baja.component';
import { updateUsersComponent } from './user-register-modificar/user-register-modificar.component';
import { UpdatePanelComponent } from './update-panel/update-panel.component';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
