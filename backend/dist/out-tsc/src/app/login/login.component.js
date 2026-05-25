import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let LoginComponent = class LoginComponent {
    // Inyección de dependencias
    constructor(toastr, _userService, router, _errorService) {
        this.toastr = toastr;
        this._userService = _userService;
        this.router = router;
        this._errorService = _errorService;
        // Definición de variables
        this.id = '';
        this.passwordEncrypt = '';
        this.loading = false;
        this.userInfo = null;
    }
    // Método de inicialización
    ngOnInit() {
        this.checkExistingToken();
    }
    // Verificar si ya existe un token válido en el localStorage
    checkExistingToken() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    this.userInfo = decoded; // Almacenar info del usuario
                    this.redirectBasedOnRole(decoded.role);
                    return;
                }
                else {
                    localStorage.removeItem('token');
                    this.router.navigate(['/']);
                }
            }
            catch (error) {
                localStorage.removeItem('token');
                this.router.navigate(['/']);
            }
        }
    }
    // Redirigir al usuario según su rol (Para un futuro manejo de roles)
    redirectBasedOnRole(role) {
        this.router.navigate(['/Home']);
    }
    // Método de login
    login() {
        if (this.id === '' || this.passwordEncrypt === '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return;
        }
        const user = {
            id: this.id,
            passwordEncrypt: this.passwordEncrypt,
        };
        this.loading = true;
        // Llamada al servicio de login
        this._userService.login(user).subscribe({
            next: (response) => {
                this.loading = false;
                // Manejo del token recibido
                if (response && response.token) {
                    try {
                        const decoded = jwtDecode(response.token);
                        const currentTime = Date.now() / 1000;
                        if (decoded.exp > currentTime) {
                            localStorage.removeItem('token');
                            localStorage.setItem('token', response.token);
                            this.userInfo = decoded; //Almacenar info del usuario
                            this.redirectBasedOnRole(decoded.role);
                        }
                        else {
                            this.toastr.error('Token expirado recibido del servidor', 'Error');
                        }
                    }
                    catch (error) {
                        console.error('Error al decodificar token:', error);
                        this.toastr.error('Token inválido recibido del servidor', 'Error');
                    }
                }
                else {
                    this.toastr.error('Token no recibido del servidor', 'Error');
                }
            },
            // Manejo de errores
            error: (e) => {
                this._errorService.msjError(e);
                this.loading = false;
                console.log("Error en el login:", e);
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        standalone: false,
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map