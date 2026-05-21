import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../../../shared/dto/login.dto';
import { ErrorService } from '../../../services/auth/error.service';
import { LoginService } from '../../../services/auth/login.service';
import { RefreshService } from '../../../services/auth/refresh.service';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  username: string;
  role: string;
  exp: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})

export class LoginComponent implements OnInit {
  // Definición de variables
  id: string = '';
  passwordEncrypt: string = '';
  loading: boolean = false;
  userInfo: any = null;

  // Inyección de dependencias
  constructor(
    private readonly toastr: ToastrService,
    private readonly _userService: LoginService,
    private readonly router: Router,
    private readonly _errorService: ErrorService,
    private readonly _refreshService: RefreshService
  ) { }

  // Método de inicialización
  ngOnInit(): void {
    this.checkExistingToken();
  }

  // Verificar si ya existe un token válido en el localStorage
  private checkExistingToken(): void {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          this.userInfo = decoded; // Almacenar info del usuario
          this.redirectBasedOnRole(decoded.role);
          return;
        } else {
          this.refreshToken();
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/']);
      }
    }
  }

  private refreshToken(): void {
    // Redirigir al usuario según su rol (Para un futuro manejo de roles)
    this._refreshService.refreshToken().subscribe({
      next: (response: any) => {
        try {
          const decoded = jwtDecode<TokenPayload>(response.token);
          if (response && response.token) {
            localStorage.setItem('accessToken', response.token);
            this.redirectBasedOnRole(decoded.role);
          }
        } catch (error) {
          console.error('Error al decodificar token:', error);
          this.toastr.error('Token inválido recibido del servidor', 'Error');
        }
      },
      error: (e: HttpErrorResponse) => {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/']);
      }
    });
  }

  private redirectBasedOnRole(role: string): void {
    this.router.navigate(['/Home']);
  }


  // Método de login
  login() {
    if (this.id === '' || this.passwordEncrypt === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const user: Login = {
      id: this.id,
      passwordEncrypt: this.passwordEncrypt,
    };

    this.loading = true;

    // Llamada al servicio de login
    this._userService.login(user).subscribe({
      next: (response: any) => {
        this.loading = false;

        // Manejo del token recibido
        if (response && response.token) {
          try {
            const decoded = jwtDecode<TokenPayload>(response.token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp > currentTime) {
              localStorage.setItem('accessToken', response.token);

              this.userInfo = decoded; //Almacenar info del usuario

              this.redirectBasedOnRole(decoded.role);
            } else {
              this.toastr.error('Token expirado recibido del servidor', 'Error');
            }
          } catch (error) {
            console.error('Error al decodificar token:', error);
            this.toastr.error('Token inválido recibido del servidor', 'Error');
          }
        } else {
          this.toastr.error('Token no recibido del servidor', 'Error');
        }
      },
      // Manejo de errores
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
        console.log("Error en el login:", e);
      }
    });
  }
}