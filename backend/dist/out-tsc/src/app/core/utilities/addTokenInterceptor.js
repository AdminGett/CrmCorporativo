import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
let AddTokenInterceptor = class AddTokenInterceptor {
    constructor(router, _errorService) {
        this.router = router;
        this._errorService = _errorService;
    }
    intercept(request, next) {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(request).pipe(catchError((error) => {
            if (error.status === 401 || error.status === 403) {
                localStorage.removeItem('token');
                this._errorService.msjError(error);
                this.router.navigate(['/login']);
            }
            return throwError(() => error);
        }));
    }
};
AddTokenInterceptor = __decorate([
    Injectable()
], AddTokenInterceptor);
export { AddTokenInterceptor };
//# sourceMappingURL=addTokenInterceptor.js.map