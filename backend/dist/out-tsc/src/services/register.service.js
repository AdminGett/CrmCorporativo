import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let RegisterService = class RegisterService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'auth/register';
    }
    signIn(user) {
        const body = {
            nombre: user.nombre,
            paterno: user.paterno,
            materno: user.materno,
            fechaNacimiento: new Date(user.fechaNacimiento).toISOString(),
            domicilio: user.domicilio,
            nss: user.nss,
            codigoPostal: user.codigoPostal,
            estado: user.estado,
            pais: user.pais,
            fechaRegistro: new Date(user.fechaRegistro).toISOString(),
            tipoUsuario: user.tipoUsuario,
            passwordEncrypt: user.passwordEncrypt,
            activo: user.activo
        };
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
    }
};
RegisterService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RegisterService);
export { RegisterService };
//# sourceMappingURL=register.service.js.map