import { Component, OnInit } from '@angular/core';
import { updateService } from '../../../services/user/update.service';
import { AuthService } from '../../../services/auth/auth.service';

import { Register } from '../../../../shared/dto/register.dto';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.scss'],
  standalone: false
})
export class UpdatePanelComponent implements OnInit {
  users: Register[] = [];
  userId!: number;
  editingUser:Register | null = null;
   loading: boolean = false;
   tipoUsuario: number = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly _updateServie: updateService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly routes: ActivatedRoute
  ) { }

  ngOnInit(): void{
    this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
    console.log('Id:', this.userId)

    if(this.userId){
      this.loadUser();
    }
  }

  showPassword = false;

  togglePassword():void{
    this.showPassword=!this.showPassword
  }
  
  loadUser(): void {
    
    this._updateServie.getUserInfo(this.userId).subscribe({
      next: (users) => {
        this.editingUser =users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getNombrePuesto(tipo: number): string {
    const puestos: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Gerente',
      3: 'Ejecutivo de ventas',
      4: 'Marketing',
      5: 'Servicio al cliente',
      6: 'Analista',
      7: 'Usuario'
    };
    return puestos[tipo] || 'Desconocido';
  }

  saveUser():void{
    if(!this.editingUser) return;

    this.loading = true;

    this._updateServie.updateUser(this.userId, this.editingUser).subscribe({
      next:()=>{
        this.toastr.success('Usuario actualizado')
      },
      error:()=>{
        this.toastr.error('Ha ocurrido un error')
      }
    });

    console.log('Usuario actualizado:', this.editingUser);

  }

  public clearInputs(): void {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach((input: any) => {
      input.value = '';
    });
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input: any) => {
      input.value = '';
    });
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input: any) => {
      input.value = '';
    });
  }

  onActivoChange(event:Event): void{
    const checked = (event.target as HTMLInputElement).checked;
    if(this.editingUser){
      this.editingUser.activo = checked ? 1:0;
    }
  }
}
