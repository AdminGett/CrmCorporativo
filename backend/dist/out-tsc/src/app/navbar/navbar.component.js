import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let NavbarComponent = class NavbarComponent {
    constructor(router, userService) {
        this.router = router;
        this.userService = userService;
        this.isLoggedIn = false;
        this.showProfileMenu = false;
        this.userName = 'Usuario';
        this.userInfo = null;
        this.userRole = null;
        this.userId = null;
    }
    ngOnInit() {
        this.checkAuthStatus();
        // Para cambios en el localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'token') {
                this.checkAuthStatus();
            }
        });
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
                else {
                    // Por si el token expira
                    console.warn('Token expirado, cerrando sesión automáticamente');
                    this.logout();
                }
            }
            catch (error) {
                console.error('Error al decodificar token:', error);
                this.logout();
            }
        }
        else {
            this.isLoggedIn = false;
            this.userName = 'Usuario';
            this.userInfo = null;
            this.userRole = null;
        }
    }
    toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
    }
    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.showProfileMenu = false;
        this.userName = 'Usuario';
        this.userInfo = null;
        this.router.navigate(['/login'], { replaceUrl: true });
    }
    // Método para cerrar el menú al hacer clic fuera
    closeProfileMenu() {
        this.showProfileMenu = false;
    }
    goToProfile(userId) {
        this.router.navigate(['/userProfile', userId]);
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss'],
        standalone: false
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map