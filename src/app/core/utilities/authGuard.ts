import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

// Estructura de datos para el payload del token JWT, incluyendo campos como id, email, username, role y exp (tiempo de expiración)
interface TokenPayload {
  id: number;
  email: string;
  username: string;
  role: string;
  exp: number; // Timestamp de expiración en segundos
}

@Injectable({
  providedIn: 'root'
})

// Guardia de autenticación para proteger rutas que requieren un token JWT válido,
//  verificando la presencia y validez del token antes de permitir el acceso a la ruta
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  // Función que se ejecuta al intentar acceder a una ruta protegida, verificando la validez del token JWT
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Se obtiene el token del localStorage
    const token = localStorage.getItem('token');

    // Si no hay token, se redirige al login y se deniega el acceso
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Se decodifica el token para verificar su validez y expiración, manejando casos de token inválido o expirado
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      
      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000; // Convertir a segundos
      
      if (decoded.exp < currentTime) {
        // Token expirado, limpiar localStorage y redirigir
        console.warn('Token expirado, redirigiendo al login');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }
      
      // Token válido y no expirado
      return true;
      
    } catch (error) {
      // Token inválido o malformado
      console.error('Token inválido:', error);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }
}