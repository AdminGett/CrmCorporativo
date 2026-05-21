import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RefreshService } from '../../services/auth/refresh.service';
import { jwtDecode } from 'jwt-decode';
import { ErrorService } from 'src/services/auth/error.service';

@Injectable()
export class AddInterceptorRefresh implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private readonly router: Router,
        private readonly _errorService: ErrorService,
        private readonly _refreshService: RefreshService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('accessToken');
        const authReq = token ? this.addToken(req, token) : req;

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.handle401Error(authReq, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        })
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.includes('auth/refresh') || req.url.includes('auth/login')){
            localStorage.removeItem('accessToken');
            this.router.navigate(['/']);
            return throwError(() => new Error('Sesion expirada'));
        }

        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next.handle(this.addToken(req, token!)))
            );
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this._refreshService.refreshToken().pipe(
            switchMap((response: any) => {
                this.isRefreshing = false;
                const newToken = response.accessToken;
                localStorage.setItem('accessToken', newToken);
                this.refreshTokenSubject.next(newToken);

                return next.handle(this.addToken(req, newToken));
            }),
            catchError((err) => {
                this.isRefreshing = false;
                localStorage.removeItem('accessToken');
                this._errorService.msjError(err);
                this.router.navigate(['/']);
                return throwError(() => err);
            })
        );
    }
}
