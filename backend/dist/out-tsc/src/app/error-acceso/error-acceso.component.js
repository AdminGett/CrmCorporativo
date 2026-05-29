import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ErrorAccesoComponent = class ErrorAccesoComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    goBack() {
        this.router.navigate(['/Home']);
    }
};
ErrorAccesoComponent = __decorate([
    Component({
        selector: 'app-error-acceso',
        templateUrl: './error-acceso.component.html',
        styleUrls: ['./error-acceso.component.scss'],
    })
], ErrorAccesoComponent);
export { ErrorAccesoComponent };
//# sourceMappingURL=error-acceso.component.js.map