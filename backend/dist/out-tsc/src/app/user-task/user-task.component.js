import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
let UserTaskComponent = class UserTaskComponent {
    constructor(userworkService, router // Inyectado para navegación
    ) {
        this.userworkService = userworkService;
        this.router = router;
        this.tareas = [];
        this.activas = [];
        this.finalizadas = [];
        this.cargando = true;
        this.usuarioId = '—';
        this.tareaSeleccionada = null;
    }
    ngOnInit() {
        this.cargarTareas();
    }
    cargarTareas() {
        this.cargando = true;
        this.userworkService.getMyWorkloads().subscribe({
            next: (data) => {
                // Carga original que te funcionaba y mostraba las tareas
                this.tareas = data;
                this.activas = data.filter(t => t.status !== 'DONE');
                this.finalizadas = data.filter(t => t.status === 'DONE');
                if (data.length > 0) {
                    this.usuarioId = String(data[0].assigned_to || data[0].created_by || '—');
                }
                this.cargando = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.cargando = false;
            }
        });
    }
    cambiarEstado(id, nuevoEstado) {
        this.userworkService.updateStatus(id, nuevoEstado).subscribe({
            next: () => this.cargarTareas(),
            error: (err) => console.error('Error al cambiar estado:', err)
        });
    }
    getBtnLabel(status) {
        if (status === 'PENDING')
            return 'Iniciar';
        if (status === 'IN_PROGRESS')
            return 'Completar';
        if (status === 'DONE')
            return 'Reabrir';
        return '';
    }
    getNextStatus(status) {
        if (status === 'PENDING')
            return 'IN_PROGRESS';
        if (status === 'IN_PROGRESS')
            return 'DONE';
        if (status === 'DONE')
            return 'PENDING';
        return '';
    }
    // FUNCIONA EL BOTÓN REABRIR
    revertirTarea(id) {
        this.userworkService.updateStatus(id, 'PENDING').subscribe({
            next: () => this.cargarTareas(),
            error: (err) => console.error('Error al revertir tarea:', err)
        });
    }
    getPriorityLabel(priority) {
        if (priority === 'HIGH')
            return 'ALTA';
        if (priority === 'MEDIUM')
            return 'MEDIA';
        if (priority === 'LOW')
            return 'BAJA';
        return priority;
    }
    getPriorityClass(priority) {
        if (priority === 'HIGH')
            return 'pri-high';
        if (priority === 'MEDIUM')
            return 'pri-medium';
        return 'pri-low';
    }
    getStatusLabel(status) {
        const map = { PENDING: 'PENDIENTE', IN_PROGRESS: 'EN PROGRESO', DONE: 'COMPLETADA' };
        return map[status] || status;
    }
    formatDate(dateStr) {
        if (!dateStr)
            return '—';
        return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    irAComentariosSinTarea() {
        // navega a comentarios de la primera tarea activa
        if (this.activas.length > 0) {
            this.router.navigate(['/userTasks', this.activas[0].id, 'comments']);
        }
        else if (this.tareas.length > 0) {
            this.router.navigate(['/userTasks', this.tareas[0].id, 'comments']);
        }
    }
    get totalPending() { return this.tareas.filter(t => t.status === 'PENDING').length; }
    get totalProgress() { return this.tareas.filter(t => t.status === 'IN_PROGRESS').length; }
    get totalDone() { return this.finalizadas.length; }
};
UserTaskComponent = __decorate([
    Component({
        selector: 'app-user-task',
        templateUrl: './user-task.component.html',
        imports: [CommonModule],
    })
], UserTaskComponent);
export { UserTaskComponent };
//# sourceMappingURL=user-task.component.js.map