import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let AnalisisPermissionsComponent = class AnalisisPermissionsComponent {
    //
    constructor(_permissionsService, toastr, routes) {
        this._permissionsService = _permissionsService;
        this.toastr = toastr;
        this.routes = routes;
        //Variable para gurardar los permisos del usuario
        this.permissionsList = [];
        //Variable para descripción del usuario
        this.descripcion = '';
        this.loading = false;
        // Estructura para agrupar permisos por módulo
        this.groups = {};
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
    // Al inicializar el componente, se obtiene el ID del usuario y la descripción de los parámetros de la ruta
    ngOnInit() {
        // Se obtiene el ID del usuario desde los parámetros de la ruta y se asigna a la variable userId, 
        // y se obtiene la descripción del usuario 
        this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
        this.descripcion = this.routes.snapshot.paramMap.get('descripcion') || '';
        //Si tiene el id del usuario carga los permisos
        if (this.userId) {
            this.loadPermissions();
        }
    }
    //Funcion para separar por grupos los permisos del usuario
    groupPermissions() {
        this.groups = {};
        // Se itera sobre la lista de permisos del usuario, extrayendo la clave de cada permiso
        // para determinar el módulo al que pertenece, y se agrupan los permisos 
        this.permissionsList.forEach(perm => {
            // extrae de la columna clave, las claves de los permisos
            const key = perm.permissionsCatalog.clave;
            // brinca la primera parte de la clave para obtener el módulo al que pertenece el permiso
            const module = key.split('.')[1];
            // Si el módulo no existe en el objeto de grupos, se crea un nuevo array para ese módulo
            if (!this.groups[module]) {
                this.groups[module] = [];
            }
            // Se agrega el permiso al grupo correspondiente según el módulo
            this.groups[module].push(perm);
        });
    }
    // Función para cargar los permisos del usuario desde el servicio, y luego agruparlos por módulo 
    // utilizando la función groupPermissions
    loadPermissions() {
        // llamada al  servicio
        this._permissionsService.getUserInfo(this.userId).subscribe({
            next: (permissions) => {
                // Se asigna la lista de permisos 
                this.permissionsList = permissions;
                this.groupPermissions();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    // Función para manejar el cambio en el estado de un permiso, actualizando el valor de "allowed" 
    // según si el checkbox está marcado o no
    onActivoChange(event, perm) {
        const checked = event.target.checked;
        perm.allowed = checked ? 1 : 0;
    }
    // Función para guardar los cambios realizados en los permisos del usuario,
    // enviando la lista actualizada de permisos al servicio para su actualización en el backend
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
__decorate([
    Input()
], AnalisisPermissionsComponent.prototype, "id", void 0);
AnalisisPermissionsComponent = __decorate([
    Component({
        selector: 'app-analisis-permissions',
        templateUrl: './analisis-permissions.component.html',
        styleUrls: ['./analisis-permissions.component.scss'],
        standalone: false
    })
], AnalisisPermissionsComponent);
export { AnalisisPermissionsComponent };
//# sourceMappingURL=analisis-permissions.component.js.map