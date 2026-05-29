import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../../../../shared/dto/payload'
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'shared/dto/register.dto';
import { permissionsService } from '../../../services/user/permission.service';
import { permissions } from 'shared/dto/permission.dto';

@Component({
  selector: 'app-permission-panel',
  templateUrl: './permission-panel.component.html',
  styleUrls: ['./permission-panel.component.scss'],
  standalone: false,

})
export class PermissionPanelComponent implements OnInit {
  isLoggedIn = false;
  showProfileMenu = false;
  userName = 'Usuario';
  userInfo: TokenPayload | null = null;
  userRole: number | null = null;
  users: permissions[] = [];
  userId!: number;
  editingPermission: permissions | null = null;
  loading: boolean = false;

  // Información del usuario seleccionado (NO el logueado)
  selectedUser: Register | null = null;

  constructor(
    private readonly _permissionsService: permissionsService,
    private readonly routes: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit() {
    // Obtener el userId de la URL (NO del token)
    this.routes.params.subscribe(params => {
      this.userId = Number(params['userId']);

      if (this.userId) {
        this.loadUserInfo(this.userId);
      } else {
        this.toastr.error('No se especificó un usuario', 'Error');
        this.router.navigate(['/users']);
      }
    });
  }

  // Cargar información del usuario SELECCIONADO
  loadUserInfo(id: number): void {
    this.loading = true;

    this._permissionsService.getUserById(id).subscribe({
      next: (userData) => {
        this.selectedUser = userData;
        this.userName = userData.nombre + ' ' + (userData.paterno || '') + ' ' + (userData.materno || '');
        this.userRole = userData.tipoUsuario;
        this.loading = false;

        console.log('Usuario seleccionado:', this.selectedUser);
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        this.toastr.error('Error al cargar información del usuario', 'Error');
        this.loading = false;
        this.userName = 'Usuario no encontrado';
      }
    });
  }
  // Verificar permisos del usuario LOGEADO (para saber qué puede ver)
  checkAuthStatus() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          this.isLoggedIn = true;
          this.userInfo = decoded; // Información del que está logueado
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    }
  }

  // En PermissionPanelComponent
  getRoleName(role: number | null): string {
    const roles: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Gerente',
      3: 'Ventas',
      4: 'Marketing',
      5: 'Soporte',
      6: 'Análisis',
      7: 'Usuario'
    };
    return role ? roles[role] || 'Desconocido' : 'No asignado';
  }

  goBack(): void {
    this.router.navigate(['/ModificarUsuario']);
  }
}