import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let PermissionPanelComponent = class PermissionPanelComponent {
    constructor(router, userService, authService, _updateServie, toastr, routes) {
        this.router = router;
        this.userService = userService;
        this.authService = authService;
        this._updateServie = _updateServie;
        this.toastr = toastr;
        this.routes = routes;
        this.isLoggedIn = false;
        this.showProfileMenu = false;
        this.userName = 'Usuario';
        this.userInfo = null;
        this.userRole = null;
        this.users = [];
        this.editingPermission = null;
    }
    ngOnInit() {
        this.checkAuthStatus();
        // Para cambios en el localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'token') {
                this.checkAuthStatus();
            }
        });
        this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
        console.log('Id:', this.userId);
        if (this.userId) {
            this.loadUser();
        }
    }
    checkAuthStatus() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                // Verificar si el token no ha expirado
                if (decoded.exp > currentTime) {
                    this.isLoggedIn = true;
                    this.userInfo = decoded;
                    this.userId = decoded.userId;
                    console.log(this.userInfo);
                    if (this.userId !== null) {
                        this.userService.getUserName(decoded.userId).subscribe({
                            next: (res) => {
                                this.userName = res.nombre;
                                this.userRole = res.tipoUsuario;
                            },
                            error: () => {
                                this.userName = 'Usuario desconocido';
                            }
                        });
                    }
                    console.log(this.userInfo);
                }
            }
            catch (error) {
                console.error('Error al decodificar token:', error);
            }
        }
        else {
            this.isLoggedIn = false;
            this.userName = 'Usuario';
            this.userInfo = null;
            this.userRole = null;
        }
    }
    loadUser() {
        this._updateServie.getUserInfo(this.userId).subscribe({
            next: (users) => {
                console.log(users);
                this.editingPermission = users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
};
PermissionPanelComponent = __decorate([
    Component({
        selector: 'app-permission-panel',
        templateUrl: './permission-panel.component.html',
        styleUrls: ['./permission-panel.component.scss'],
        standalone: false
    })
], PermissionPanelComponent);
export { PermissionPanelComponent };
//# sourceMappingURL=permission-panel.component.js.map