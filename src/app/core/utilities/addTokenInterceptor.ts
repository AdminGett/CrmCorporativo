import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error.service';

// Interceptor para agregar el token de autenticación a las solicitudes HTTP, y manejar errores de autenticación
@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router, 
    private readonly _errorService: ErrorService
  ) { }

  // Función que intercepta las solicitudes HTTP, agregando el token de autenticación si está presente, 
  // y manejando errores de autenticación
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Si el token existe, se clona la solicitud original y se agrega el encabezado de autorización con el token
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    // Se maneja la respuesta de la solicitud, capturando errores de autenticación (401 o 403) para eliminar el token,
    //  mostrar un mensaje de error y redirigir al usuario a la página de inicio de sesión
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem('token');
          this._errorService.msjError(error);
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}