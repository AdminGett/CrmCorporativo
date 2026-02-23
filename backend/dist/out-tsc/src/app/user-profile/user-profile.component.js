import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UserProfileComponent = class UserProfileComponent {
    constructor(_updateService, routes) {
        this._updateService = _updateService;
        this.routes = routes;
        //Variables ausr
        this.users = [];
        this.userInfo = null;
        this.loading = false;
    }
    ngOnInit() {
        //  Toma el ID desde la URL
        this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
        if (this.userId) {
            this.loadUser();
        }
        console.log(this.users);
    }
    loadUser() {
        this._updateService.getUserInfo(this.userId).subscribe({
            next: (users) => {
                console.log(users);
                this.userInfo = users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
};
UserProfileComponent = __decorate([
    Component({
        selector: 'app-user-profile',
        templateUrl: './user-profile.component.html',
        styleUrls: ['./user-profile.component.scss'],
        standalone: false
    })
], UserProfileComponent);
export { UserProfileComponent };
//# sourceMappingURL=user-profile.component.js.map