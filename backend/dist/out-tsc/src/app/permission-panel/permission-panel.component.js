import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let PermissionPanelComponent = class PermissionPanelComponent {
    constructor(_permissionsService, routes, router, toastr) {
        this._permissionsService = _permissionsService;
        this.routes = routes;
        this.router = router;
        this.toastr = toastr;
        this.isLoggedIn = false;
        this.showProfileMenu = false;
        this.userName = 'Usuario';
        this.userInfo = null;
        this.userRole = null;
        this.users = [];
        this.editingPermission = null;
        this.loading = false;
        // Información del usuario seleccionado (NO el logueado)
        this.selectedUser = null;
    }
    ngOnInit() {
        // Obtener el userId de la URL (NO del token)
        this.routes.params.subscribe(params => {
            this.userId = Number(params['userId']);
            if (this.userId) {
                this.loadUserInfo(this.userId);
            }
            else {
                this.toastr.error('No se especificó un usuario', 'Error');
                this.router.navigate(['/users']);
            }
        });
    }
    // Cargar información del usuario SELECCIONADO
    loadUserInfo(id) {
        this.loading = true;
        this._permissionsService.getUserById(id).subscribe({
            next: (userData) => {
                this.selectedUser = userData;
                this.userName = userData.nombre + ' ' + (userData.paterno || '') + ' ' + (userData.materno || '');
                this.userRole = userData.tipoUsuario;
                this.loading = false;
                console.log('Usuario seleccionado:', this.selectedUser);
            },
            error: (error) => {
                console.error('Error al cargar usuario:', error);
                this.toastr.error('Error al cargar información del usuario', 'Error');
                this.loading = false;
                this.userName = 'Usuario no encontrado';
            }
        });
    }
    // Verificar permisos del usuario LOGEADO (para saber qué puede ver)
    checkAuthStatus() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    this.isLoggedIn = true;
                    this.userInfo = decoded; // Información del que está logueado
                }
            }
            catch (error) {
                console.error('Error al decodificar token:', error);
            }
        }
    }
    // En PermissionPanelComponent
    getRoleName(role) {
        const roles = {
            1: 'Administrador',
            2: 'Gerente',
            3: 'Ventas',
            4: 'Marketing',
            5: 'Soporte',
            6: 'Análisis',
            7: 'Usuario'
        };
        return role ? roles[role] || 'Desconocido' : 'No asignado';
    }
    goBack() {
        this.router.navigate(['/ModificarUsuario']);
    }
};
PermissionPanelComponent = __decorate([
    Component({
        selector: 'app-permission-panel',
        templateUrl: './permission-panel.component.html',
        styleUrls: ['./permission-panel.component.scss'],
        standalone: false,
    })
], PermissionPanelComponent);
export { PermissionPanelComponent };
//# sourceMappingURL=permission-panel.component.js.map