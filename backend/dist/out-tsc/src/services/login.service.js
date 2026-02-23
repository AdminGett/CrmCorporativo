import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'auth/login';
    }
    login(user) {
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
    }
};
LoginService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map