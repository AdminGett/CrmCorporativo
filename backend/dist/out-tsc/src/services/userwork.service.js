import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
let UserworkService = class UserworkService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'userworks/';
    }
    getMyWorkloads() {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}my`);
    }
    updateStatus(id, status) {
        return this.http.patch(`${this.myAppUrl}${this.myApiUrl}${id}/status`, { status });
    }
};
UserworkService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserworkService);
export { UserworkService };
//# sourceMappingURL=userwork.service.js.map