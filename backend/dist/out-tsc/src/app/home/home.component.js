import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
let HomeComponent = class HomeComponent {
    constructor(router) {
        this.router = router;
        this.userInfo = null;
    }
    ngOnInit() {
        this.checkExistingToken();
    }
    checkExistingToken() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    this.userInfo = decoded; // Almacenar info del usuario
                    return;
                }
                else {
                    localStorage.removeItem('token');
                    this.router.navigate(['/']);
                }
            }
            catch (error) {
                localStorage.removeItem('token');
                this.router.navigate(['/']);
            }
        }
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
        standalone: false,
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map