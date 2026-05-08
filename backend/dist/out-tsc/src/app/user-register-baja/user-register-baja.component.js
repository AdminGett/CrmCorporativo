import { __decorate } from "tslib";
import { Component } from '@angular/core';
let deleteUsersComponent = class deleteUsersComponent {
    constructor(_deleteService, toastr) {
        this._deleteService = _deleteService;
        this.toastr = toastr;
        this.users = [];
        this.filterValue = "";
        this.buscado = false;
    }
    ngOnInit() {
        this.fetchUsers();
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