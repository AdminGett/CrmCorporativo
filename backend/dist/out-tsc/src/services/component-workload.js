import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
let ComponentWorkloadService = class ComponentWorkloadService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/component-workload'; // Tu ruta base en el backend
    }
    // ==========================================
    // 1. OBTENER TAREAS POR USUARIO
    // ==========================================
    getWorkloadByUser(userId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/user/${userId}`);
    }
    // ==========================================
    // 2. CREAR UNA NUEVA TAREA
    // ==========================================
    createWorkloadTask(task) {
        const body = {
            userAssignedId: task.userAssignedId,
            title: task.title,
            descriptionTask: task.descriptionTask,
            dateDue: new Date(task.dateDue).toISOString(), // Formateamos la fecha a ISO string
            submintedAt: new Date().toISOString(), // Ojo: con una sola 't' como tu base de datos
            statusTask: task.statusTask,
            priority: task.priority
        };
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
    }
    // ==========================================
    // 3. OBTENER COMENTARIOS DE UNA TAREA
    // ==========================================
    getCommentsByTask(taskId) {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/comments/task/${taskId}`);
    }
    // ==========================================
    // 4. CREAR UN NUEVO COMENTARIO
    // ==========================================
    createComment(comment) {
        const body = {
            userComment: comment.userComment,
            taskComment: comment.taskComment,
            commentText: comment.commentText
            // Nota: No enviamos 'submittedAt' de forma manual porque tu backend 
            // lo rellena automáticamente en MySQL usando 'DataTypes.NOW'
        };
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}/comments`, body);
    }
};
ComponentWorkloadService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ComponentWorkloadService);
export { ComponentWorkloadService };
//# sourceMappingURL=component-workload.js.map