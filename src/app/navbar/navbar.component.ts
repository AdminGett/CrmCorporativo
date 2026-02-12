import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { userService } from '../../services/navbar.service';
import {TokenPayload} from '../../../shared/dto/payload'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  showProfileMenu = false;
  userName = 'Usuario';
  userInfo: TokenPayload | null = null;
  userRole: number | null=null;
  userId: number | null=null;

  

  constructor(private readonly router: Router,
    private readonly userService:userService
  ) { }

  ngOnInit() {
    this.checkAuthStatus();
    // Para cambios en el localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'token') {
        this.checkAuthStatus();
      }
    });
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;

        // Verificar si el token no ha expirado
        if (decoded.exp > currentTime) {
          this.isLoggedIn = true;
          this.userInfo  = decoded;
          this.userId = decoded.userId;
          

          console.log(this.userInfo)
          
          if(this.userId !== null){
            this.userService.getUserName(decoded.userId).subscribe({
            next:  (res)=>{
              this.userName = res.nombre;
              this.userRole = res.tipoUsuario;
            },
            error:()=>{
              this.userName  = 'Usuario desconocido';
            }
          });
          }

          console.log(this.userInfo);

        } else {
          // Por si el token expira
          console.warn('Token expirado, cerrando sesión automáticamente');
          this.logout();
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        this.logout();
      }
    } else {
      this.isLoggedIn = false;
      this.userName = 'Usuario';
      this.userInfo = null;
      this.userRole = null; 
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.showProfileMenu = false;
    this.userName = 'Usuario';
    this.userInfo = null;
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  // Método para cerrar el menú al hacer clic fuera
  closeProfileMenu() {
    this.showProfileMenu = false;
  }

  goToProfile(userId:number):void {
   this.router.navigate(['/userProfile', userId]);
  }
}