import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let deleteService = class deleteService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'users';
    }
    getAll() {
        const url = `${this.myAppUrl}${this.myApiUrl}/`;
        return this.http.get(url);
    }
    deleteProduct(id) {
        const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
        return this.http.delete(url);
    }
    searchByName(name) {
        const url = `${this.myAppUrl}${this.myApiUrl}/search?search=${encodeURIComponent(name.trim())}`;
        console.log('URL de búsqueda:', url);
        return this.http.get(url);
    }
};
deleteService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], deleteService);
export { deleteService };
//# sourceMappingURL=delete.service.js.map