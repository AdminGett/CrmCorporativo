import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let AuthService = class AuthService {
    constructor() { }
    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        }
        catch (error) {
            return false;
        }
    }
    getToken() {
        return localStorage.getItem('token');
    }
    getUserId() {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        }
        catch (error) {
            return null;
        }
    }
    getUserRole() {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            const decoded = jwtDecode(token);
            return decoded.role;
        }
        catch (error) {
            return null;
        }
    }
    logout() {
        localStorage.removeItem('token');
    }
    isTokenExpired() {
        const token = this.getToken();
        if (!token) {
            return true;
        }
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        }
        catch (error) {
            return true;
        }
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map