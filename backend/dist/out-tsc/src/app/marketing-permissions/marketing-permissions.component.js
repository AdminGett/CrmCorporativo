import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MarketingPermissionsComponent = class MarketingPermissionsComponent {
    constructor(_permissionsService, toastr, routes) {
        this._permissionsService = _permissionsService;
        this.toastr = toastr;
        this.routes = routes;
        this.isLoggedIn = false;
        this.showProfileMenu = false;
        this.userName = 'Usuario';
        this.userInfo = null;
        this.userRole = null;
        this.permissionsList = [];
        this.descripcion = '';
        this.loading = false;
        // Estructura para agrupar permisos por módulo
        this.groups = [];
        // groups: Record<string, permissions[]> = {};
        // Mapeo de claves a nombres legibles
        this.moduleNames = {
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
        };
    }
    ngOnInit() {
        this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
        this.descripcion = this.routes.snapshot.paramMap.get('descripcion') || '';
        if (this.userId) {
            this.loadPermissions();
        }
    }
    groupPermissions() {
        const map = {};
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
    loadPermissions() {
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
    onActivoChange(event, perm) {
        const checked = event.target.checked;
        perm.allowed = checked ? 1 : 0;
    }
    saveChanges() {
        if (!this.permissionsList)
            return;
        this.loading = true;
        this._permissionsService.updatePermissions(this.userId, this.permissionsList).subscribe({
            next: () => {
                this.toastr.success('Usuario actualizado');
            },
            error: () => {
                this.toastr.error('Ha ocurrido un error');
            }
        });
    }
};
MarketingPermissionsComponent = __decorate([
    Component({
        selector: 'app-marketing-permissions',
        templateUrl: './marketing-permissions.component.html',
        styleUrls: ['./marketing-permissions.component.scss'],
        standalone: false
    })
], MarketingPermissionsComponent);
export { MarketingPermissionsComponent };
//# sourceMappingURL=marketing-permissions.component.js.map