import { Component, OnInit } from '@angular/core';
import { deleteService } from '../../../services/user/delete.service';
import { Register } from '../../../../shared/dto/register.dto';
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

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPage: number = 0;
  paginatedUsers: Register[] = [];
  Math = Math;

  constructor(
    private readonly _deleteService: deleteService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

   calculateTotalPages(): void {
    this.totalPage = Math.ceil(this.users.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPage) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedUsers();
      }
    }

    nextPage(): void {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        this.updatePaginatedUsers();
      }
    }

    getPageNumbers(): number[] {
      const pages: number[] = [];
      const maxPagesToShow = 5;
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.totalPage, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for(let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }


  fetchUsers(): void {
    this._deleteService.getAll().subscribe({
      next: (data:any[]) => {
        console.log('Usuarios recibidos:', data);
        this.users = data.map(user => ({
        userId: user.userId,
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

      this,this.currentPage = 1;
      this.calculateTotalPages();
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


    this._deleteService.searchByName(search).subscribe({

      next: (data) => {
        console.log('Usuarios encontrados:', data); 
        if (data == null || data.length === 0) {
          this.toastr.info('No se encontraron usuarios con ese nombre', 'Información');
          
          return;
        }
        this.users = data;
         this,this.currentPage = 1;
      this.calculateTotalPages();
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
      this.fetchUsers();
    });
  }
}