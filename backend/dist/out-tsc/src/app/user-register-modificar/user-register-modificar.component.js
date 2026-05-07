import { __decorate } from "tslib";
import { Component } from '@angular/core';
let updateUsersComponent = class updateUsersComponent {
    constructor(_deleteService, toastr, router) {
        this._deleteService = _deleteService;
        this.toastr = toastr;
        this.router = router;
        this.users = [];
        this.filterValue = "";
        this.buscado = false;
        this.showProfileMenu = false;
        this.openMenuUserId = null;
    }
    ngOnInit() {
        this.fetchUsers();
    }
    fetchUsers() {
        this._deleteService.getAll().subscribe({
            next: (data) => {
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
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
                this.toastr.error('Error al cargar usuarios', 'Error');
            }
        });
    }
    goToUpdate(userId) {
        this.router.navigate(['/users/update/getUser', userId]);
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
    toggleProfileMenu(userId) {
        this.openMenuUserId = this.openMenuUserId === userId ? null : userId;
        // this.showProfileMenu = !this.showProfileMenu;
    }
};
updateUsersComponent = __decorate([
    Component({
        selector: 'app-delete-users',
        templateUrl: './user-register-modificar.component.html',
        styleUrls: ['./user-register-modificar.component.scss'],
        standalone: false
    })
], updateUsersComponent);
export { updateUsersComponent };
//# sourceMappingURL=user-register-modificar.component.js.map