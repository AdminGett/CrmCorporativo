import { __decorate } from "tslib";
// src/app/auth/services/product.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let updateService = class updateService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'users';
    }
    getAll() {
        const url = `${this.myAppUrl}${this.myApiUrl}/`;
        return this.http.get(url);
    }
    searchByName(name) {
        const url = `${this.myAppUrl}${this.myApiUrl}/search?search=${encodeURIComponent(name.trim())}`;
        return this.http.get(url);
    }
    updateUser(userId, users) {
        const url = `${this.myAppUrl}${this.myApiUrl}/update/${userId}`;
        return this.http.put(url, users);
    }
    getUserInfo(userId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/update/getUser/${userId}`);
    }
};
updateService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], updateService);
export { updateService };
//# sourceMappingURL=update.service.js.map