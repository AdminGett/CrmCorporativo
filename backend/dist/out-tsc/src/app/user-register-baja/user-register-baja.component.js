import { __decorate } from "tslib";
import { Component } from '@angular/core';
let deleteUsersComponent = class deleteUsersComponent {
    constructor(_deleteService, toastr) {
        this._deleteService = _deleteService;
        this.toastr = toastr;
        this.users = [];
        this.filterValue = "";
        this.buscado = false;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.totalPage = 0;
        this.paginatedUsers = [];
        this.Math = Math;
    }
    ngOnInit() {
        this.fetchUsers();
    }
    calculateTotalPages() {
        this.totalPage = Math.ceil(this.users.length / this.itemsPerPage);
        this.updatePaginatedUsers();
    }
    updatePaginatedUsers() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedUsers = this.users.slice(startIndex, endIndex);
    }
    changePage(page) {
        if (page >= 1 && page <= this.totalPage) {
            this.currentPage = page;
            this.updatePaginatedUsers();
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedUsers();
        }
    }
    nextPage() {
        if (this.currentPage < this.totalPage) {
            this.currentPage++;
            this.updatePaginatedUsers();
        }
    }
    getPageNumbers() {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(this.totalPage, startPage + maxPagesToShow - 1);
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }
    fetchUsers() {
        this._deleteService.getAll().subscribe({
            next: (data) => {
                console.log('Usuarios recibidos:', data);
                this.users = data.map(user => ({
                    userId: user.userId, // 👈 MAPEO CLAVE
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
                this, this.currentPage = 1;
                this.calculateTotalPages();
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
                this.toastr.error('Error al cargar usuarios', 'Error');
            }
        });
    }
    deleteUser(id) {
        if (!confirm('¿Seguro que deseas eliminar este Usuario?'))
            return;
        this._deleteService.deleteProduct(id).subscribe({
            next: () => {
                this.toastr.success('Usuario eliminado');
                this.fetchUsers();
            },
            error: (error) => {
                console.error('Error al eliminar:', error);
                this.toastr.error('Error al eliminar', 'Error');
            }
        });
    }
    findUserByName(name) {
        const search = name.trim();
        if (!this.validateFields()) {
            this.toastr.error('Es necesario un un parametro de busqueda');
            this.fetchUsers();
            return;
        }
        if (!search) {
            this.users = [];
            return;
        }
        this.buscado = true;
        this._deleteService.searchByName(search).subscribe({
            next: (data) => {
                console.log('Usuarios encontrados:', data);
                if (data == null || data.length === 0) {
                    this.toastr.info('No se encontraron usuarios con ese nombre', 'Información');
                    return;
                }
                this.users = data;
                this, this.currentPage = 1;
                this.calculateTotalPages();
            },
            error: (error) => {
                console.error('Error al buscar usuarios:', error);
                this.toastr.error('Error al buscar usuarios', 'Error');
            }
        });
    }
    validateFields() {
        return this.filterValue.trim() !== '';
    }
    clearInput() {
        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach((input) => {
            this.filterValue = '';
            this.fetchUsers();
        });
    }
};
deleteUsersComponent = __decorate([
    Component({
        selector: 'app-delete-users',
        templateUrl: './user-register-baja.component.html',
        styleUrls: ['./user-register-baja.component.scss'],
        standalone: false
    })
], deleteUsersComponent);
export { deleteUsersComponent };
//# sourceMappingURL=user-register-baja.component.js.map