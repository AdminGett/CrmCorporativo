import { __decorate } from "tslib";
// src/app/auth/services/product.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let permissionsService = class permissionsService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'permissions';
    }
    getAll() {
        const url = `${this.myAppUrl}${this.myApiUrl}/`;
        return this.http.get(url);
    }
    updatePermissions(userId, permissions) {
        const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
        return this.http.put(url, permissions);
    }
    getUserInfo(userId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/getUser/${userId}`);
    }
    getUserById(userId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/getUserById/${userId}`);
    }
};
permissionsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], permissionsService);
export { permissionsService };
//# sourceMappingURL=permission.service.js.map