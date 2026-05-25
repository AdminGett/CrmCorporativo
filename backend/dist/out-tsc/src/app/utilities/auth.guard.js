import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(route, state) {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }
        try {
            const decoded = jwtDecode(token);
            // Verificar si el token ha expirado
            const currentTime = Date.now() / 1000; // Convertir a segundos
            if (decoded.exp < currentTime) {
                // Token expirado, limpiar localStorage y redirigir
                console.warn('Token expirado, redirigiendo al login');
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
                return false;
            }
            if (decoded.role.toString() !== '1' && decoded.role.toString() !== '2') {
                console.log(decoded.role);
                this.router.navigate(['/accessDenied']);
                return false;
            }
            // Token válido y no expirado
            return true;
        }
        catch (error) {
            // Token inválido o malformado
            console.error('Token inválido:', error);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return false;
        }
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map