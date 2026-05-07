import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let userService = class userService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'users';
    }
    getUserName(userId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${userId}`);
    }
};
userService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], userService);
export { userService };
//# sourceMappingURL=navbar.service.js.map