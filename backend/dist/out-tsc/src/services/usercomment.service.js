import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';
let UserCommentService = class UserCommentService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
    }
    getUserId() {
        const token = localStorage.getItem('token');
        if (!token)
            return 0;
        const decoded = jwtDecode(token);
        return decoded.id;
    }
    getComments(workloadId) {
        return this.http.get(`${this.myAppUrl}comments/workload/${workloadId}`);
    }
    createComment(workloadId, content) {
        const user_id = this.getUserId();
        return this.http.post(`${this.myAppUrl}comments`, {
            workload_id: workloadId,
            user_id,
            content
        });
    }
};
UserCommentService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserCommentService);
export { UserCommentService };
//# sourceMappingURL=usercomment.service.js.map