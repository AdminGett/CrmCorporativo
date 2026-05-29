import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/auth/error.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly _errorService: ErrorService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('accessToken');

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        }

        if (error.status === 403) {
          this.router.navigate(['/accessDenied']);
        }

        this._errorService.msjError(error);

        return throwError(() => error);
      })
    );
  }
}