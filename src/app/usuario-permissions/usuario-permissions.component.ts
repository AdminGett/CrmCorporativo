import { Component, Input, OnInit } from '@angular/core';
import { TokenPayload } from '../../../shared/dto/payload'
import { userService } from '../../services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { permissionsService } from 'src/services/permission.service';
import { permissions } from 'shared/dto/permission.dto';

@Component({
  selector: 'app-usuario-permissions',
  templateUrl: './usuario-permissions.component.html',
  styleUrls: ['./usuario-permissions.component.scss'],
  standalone: false
})
export class UsuarioPermissionsComponent  implements OnInit {
    @Input() id!: number; 
isLoggedIn = false;
  showProfileMenu = false;
  userName = 'Usuario';
  userInfo: TokenPayload | null = null;
  userRole: number | null = null;
  userId!: number;
  permissionsList: permissions[] = [];
  descripcion: string = '';
  loading: boolean = false;
  // Estructura para agrupar permisos por módulo
  groups:{module:string, permissions:permissions[]}[] = [];
  // groups: Record<string, permissions[]> = {};
  // Mapeo de claves a nombres legibles
  moduleNames:Record<string, string> = {
    sales: 'Ventas',
    clients: 'Clientes',
    reports: 'Reportes',
    team: 'Equipos',
    forecast: 'Forecast',
    products: 'Productos',
    dashboard: 'Escritorio',
    settings: 'Configuraciones',
    access: 'Accesso',
    user: 'Usuarios',
    role: 'Roles',
    security: 'Seguridad',
    fields: 'Campos',
    workflow: 'Workflow',
    automation: 'Automatización',
    data: 'Información',
    integrations: 'Integraciones',
    api: 'APIs',
    publicLogs: 'publicLogs',
    backup: 'Respaldos',
    activity: 'Actividades',
    price: 'Cotizaciones',
    proposal: 'Propuestas de venta',
    report: 'Reportes',
    calendar: 'Calendario',
    notify: 'Notificaciones',
    leads: 'Clientes potenciales',
    campaigns: 'Campañas',
    segments: 'Segmentos',
    analytics: 'Analíticas',
    content: 'Contenido',
    forms: 'Formularios',
    tickets: 'Tickets',
    contacts: 'Contactos',
    knowledge: 'Base de conocimiento',
    chat: 'Chat en vivo',
    satisfaction: 'Satisfacción',
    sla: 'SLA',
    export: 'Exportación',
    analysis: 'Análisis',
    activities: 'Actividades',
    documents: 'Documentos'
  }


  constructor(
    private readonly _permissionsService: permissionsService,
    private readonly toastr: ToastrService,
    private readonly routes: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
    this.descripcion = this.routes.snapshot.paramMap.get('descripcion') || '';

    if (this.userId) {
      this.loadPermissions();
    }
  }

  groupPermissions() {
    const map: Record<string, permissions[]> = {};

    this.permissionsList.forEach(perm => {
      const key = perm.permissionsCatalog?.clave || '';
      const parts = key.split('.');
      const module = parts.length > 1 ? parts[1] : 'otros';

      if (!map[module]) {
        map[module] = [];
      }

      map[module].push(perm);
    });

    this.groups = Object.keys(map).map(key => ({
      module: key,
      permissions: map[key]
    }));

    // this.groups = {};

    // this.permissionsList.forEach(perm => {
    //   const key = perm.permissionsCatalog?.clave || '';
    //   const parts = key.split('.');
    //   const module = parts.length > 1 ? parts[1] : 'otros';

    //   if (!this.groups[module]) {
    //     this.groups[module] = [];
    //   }

    //   this.groups[module].push(perm);
    // });

    // console.log("this.groups:", this.groups);
  }

  loadPermissions(): void {

    this._permissionsService.getUserInfo(this.userId).subscribe({
      next: (permissions) => {
        console.log(permissions);
        console.log("CLAVES:", permissions.map(p => p.permissionsCatalog.clave));
        this.permissionsList = permissions;
        this.groupPermissions();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  onActivoChange(event: Event, perm: permissions): void {
    const checked = (event.target as HTMLInputElement).checked;
    perm.allowed = checked ? 1 : 0;
  }

  saveChanges(): void {
    if (!this.permissionsList) return;

    this.loading = true;

    this._permissionsService.updatePermissions(this.userId, this.permissionsList).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado')
      },
      error: () => {
        this.toastr.error('Ha ocurrido un error')
      }
    });

  }

}
