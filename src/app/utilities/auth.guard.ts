import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  user_Id: number;
  role: string;
  exp: number; // Timestamp de expiración en segundos
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean {

    const token = localStorage.getItem('accessToken');
    

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000; // Convertir a segundos

      if (decoded.exp < currentTime) {
        // Token expirado, limpiar localStorage y redirigir
        console.warn('Token expirado, redirigiendo al login');
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
        return false;

      }

      if(decoded.role.toString() !== '1' && decoded.role.toString()  !== '2'){
        console.log(decoded.role)
        this.router.navigate(['/accessDenied']);
        return false;
      }

      // Token válido y no expirado
      return true;

    } catch (error) {
      // Token inválido o malformado
      console.error('Token inválido:', error);
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
      return false;
    }

    
  }
}

