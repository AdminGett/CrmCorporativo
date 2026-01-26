import { Component, OnInit } from '@angular/core';
import { deleteService } from '../../services/delete.service';
import { Register } from '../../../shared/dto/register.dto';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-users',
  templateUrl: './user-register-baja.component.html',
  styleUrls: ['./user-register-baja.component.scss'],
  standalone: false
})
export class deleteUsersComponent implements OnInit {

  users: Register[] = [];
  filterValue: string = "";
  buscado: boolean = false;

  constructor(
    private readonly _deleteService: deleteService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this._deleteService.getAll().subscribe({
      next: (data:any[]) => {
        console.log('Usuarios recibidos:', data);
        this.users = data.map(user => ({
        userId: user.userId,        // 👈 MAPEO CLAVE
        passwordEncrypt: user.passwordEncrypt,
        nombre: user.nombre,
        paterno: user.paterno,
        materno: user.materno,
        fechaNacimiento: user.fechaNacimiento,
        domicilio: user.domicilio,
        nss: user.nss,
        codigoPostal: user.codigoPostal,
        estado: user.estado,
        pais: user.pais,
        fechaRegistro: user.fechaRegistro,
        tipoUsuario: user.tipoUsuario,
        activo: user.activo
      }));
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar usuarios:', error);
        this.toastr.error('Error al cargar usuarios', 'Error');
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este Usuario?')) return;

    this._deleteService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('Usuario eliminado');
        this.fetchUsers();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar:', error);
        this.toastr.error('Error al eliminar', 'Error');
      }
    });
  }
  
  
  findUserByName(name: string): void {
    const search = name.trim();

    if(!this.validateFields()){
      this.toastr.error('Es necesario un un parametro de busqueda');
      this.fetchUsers();
      return;
    }
    if (!search) {
      this.users = [];
      return;
    }
    this.buscado =  true;

    console.log('Buscando usuario por nombre:', name);

    this._deleteService.searchByName(search).subscribe({

      next: (data) => {
        console.log('Usuarios encontrados:', data); 
        if (data == null || data.length === 0) {
          this.toastr.info('No se encontraron usuarios con ese nombre', 'Información');
          
          return;
        }
        this.users = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al buscar usuarios:', error);
        this.toastr.error('Error al buscar usuarios', 'Error');
      }
    });

  }
  validateFields(): boolean{
    return this.filterValue.trim() !== '';
  }

  public clearInput(): void {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach((input: any) => {
     this.filterValue= '';
    });
  }
}