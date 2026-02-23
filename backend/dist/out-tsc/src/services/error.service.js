import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ErrorService = class ErrorService {
    constructor(toastr) {
        this.toastr = toastr;
    }
    msjError(e) {
        if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
        }
        else {
            this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
        }
    }
};
ErrorService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ErrorService);
export { ErrorService };
//# sourceMappingURL=error.service.js.map