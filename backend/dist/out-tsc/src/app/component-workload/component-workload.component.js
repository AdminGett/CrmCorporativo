import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
let ComponentWorkloadComponent = class ComponentWorkloadComponent {
    constructor(_workloadService) {
        this._workloadService = _workloadService;
        this.tasksList = [];
        this.filteredTasksList = [];
        this.commentsList = [];
        // Selección activa
        this.selectedTask = null;
        this.currentUserId = 5; // ID del estudiante / usuario actual
        // Filtros interactivos
        this.statusFilter = '';
        this.priorityFilter = '';
        // Formulario comentario
        this.newCommentText = '';
        // Métricas
        this.totalTasks = 0;
        this.pendingTasks = 0;
        this.progressTasks = 0;
        this.completedTasks = 0;
    }
    ngOnInit() {
        this.obtenerTareas();
    }
    obtenerTareas() {
        this._workloadService.getWorkloadByUser(this.currentUserId).subscribe({
            next: (data) => {
                this.tasksList = data;
                this.filteredTasksList = data;
                this.calcularMetricas();
            },
            error: (err) => console.error('Error cargando tareas del backend:', err)
        });
    }
    calcularMetricas() {
        this.totalTasks = this.tasksList.length;
        this.pendingTasks = this.tasksList.filter(t => t.statusTask === 'pending').length;
        this.progressTasks = this.tasksList.filter(t => t.statusTask === 'in_progress').length;
        this.completedTasks = this.tasksList.filter(t => t.statusTask === 'completed').length;
    }
    aplicarFiltros() {
        this.filteredTasksList = this.tasksList.filter(task => {
            const matchStatus = this.statusFilter ? task.statusTask === this.statusFilter : true;
            const matchPriority = this.priorityFilter ? task.priority === this.priorityFilter : true;
            return matchStatus && matchPriority;
        });
    }
    seleccionarTarea(task) {
        this.selectedTask = task;
        this.newCommentText = '';
        if (task.id) {
            this.cargarComentarios(task.id);
        }
    }
    cargarComentarios(taskId) {
        this._workloadService.getCommentsByTask(taskId).subscribe({
            next: (data) => this.commentsList = data,
            error: (err) => console.error('Error al traer comentarios:', err)
        });
    }
    agregarComentario() {
        if (!this.newCommentText.trim() || !this.selectedTask?.id)
            return;
        const comentario = {
            userComment: this.currentUserId,
            taskComment: this.selectedTask.id,
            commentText: this.newCommentText,
            id: 0,
            submittedAt: new Date().toISOString() // Genera un formato "2026-05-23T..."
        };
        this._workloadService.createComment(comentario).subscribe({
            next: () => {
                this.newCommentText = '';
                if (this.selectedTask?.id) {
                    this.cargarComentarios(this.selectedTask.id);
                }
            },
            error: (err) => console.error('Error al guardar el comentario:', err)
        });
    }
};
ComponentWorkloadComponent = __decorate([
    Component({
        selector: 'app-component-workload',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './component-workload.component.html',
        styleUrls: ['./component-workload.component.scss'],
    })
], ComponentWorkloadComponent);
export { ComponentWorkloadComponent };
//# sourceMappingURL=component-workload.component.js.map