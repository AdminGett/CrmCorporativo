import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
let PanelAdminComponent = class PanelAdminComponent {
    constructor(http) {
        this.http = http;
        // API Base URL
        this.apiUrl = 'http://localhost:3000/api';
        // Mapa de roles: string → integer que espera la BD
        this.roleMap = {
            'USER': 1,
            'ADMIN': 2,
            'MEDICO': 3
        };
        this.currentUserId = 0;
        this.currentUserEmail = '';
        this.currentUserRole = 'ADMIN';
        // Current view
        this.currentView = 'dashboard';
        // Stats
        this.stats = {
            totalUsers: 0,
            totalTasks: 0,
            pendingTasks: 0,
            completedTasks: 0
        };
        // Users
        this.allUsers = [];
        this.recentUsers = [];
        this.showUserForm = false;
        // Reemplaza userForm por esta versión que incluye tipoUsuarioStr
        this.userForm = {
            nombre: '',
            paterno: '',
            materno: '',
            fechaNacimiento: '',
            domicilio: '',
            nss: '',
            codigoPostal: '',
            estado: '',
            pais: '',
            passwordEncrypt: '',
            tipoUsuarioStr: 'USER', // solo para el <select>
            activo: 1
        };
        // Edición de usuarios
        this.showEditForm = false;
        this.editForm = {};
        this.editingUserId = null;
        // Workloads
        this.workloads = [];
        this.recentWorkloads = [];
        this.showWorkloadForm = false;
        this.workloadForm = {
            title: '',
            description: '',
            priority: 'MEDIUM',
            assigned_to: null,
            due_date: ''
        };
        this.filters = {
            status: '',
            priority: '',
            assigned_to: null
        };
        // Selected workload for detail view
        this.selectedWorkload = null;
        this.workloadComments = [];
        this.workloadLogs = [];
        this.newComment = '';
        // Logs & Comments
        this.allLogs = [];
        this.recentLogs = [];
        this.allComments = [];
        this.recentComments = [];
        // User panel
        this.myWorkloads = [];
        this.myComments = [];
        this.quickComment = '';
    }
    ngOnInit() {
        // Obtener datos del usuario desde localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsed = JSON.parse(userData);
            this.currentUserId = parsed.userId;
            this.currentUserEmail = parsed.email || parsed.nombre;
        }
        this.loadDashboard();
    }
    // ========== NAVIGATION ==========
    showView(view) {
        this.currentView = view;
        switch (view) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'users':
                this.loadAllUsers();
                break;
            case 'workloads':
                this.loadWorkloads();
                this.loadAllUsers();
                break;
            case 'logs':
                this.loadAllLogs();
                break;
            case 'comments':
                this.loadAllComments();
                break;
            case 'userpanel':
                this.loadMyWorkloads();
                this.loadMyComments();
                break;
        }
    }
    // ========== DASHBOARD ==========
    async loadDashboard() {
        try {
            // Usuarios — independiente
            const users = await this.http.get(`${this.apiUrl}/users`)
                .toPromise().catch(() => []);
            const userList = users || [];
            this.stats.totalUsers = userList.length;
            this.recentUsers = userList.slice(0, 5);
            // Workloads — independiente, no mata el dashboard si falla
            const workloads = await this.http.get(`${this.apiUrl}/workloads`)
                .toPromise().catch(() => []);
            const workloadList = workloads || [];
            this.stats.totalTasks = workloadList.length;
            this.stats.pendingTasks = workloadList.filter(w => w.status === 'PENDING').length;
            this.stats.completedTasks = workloadList.filter(w => w.status === 'DONE').length;
            this.recentWorkloads = workloadList.slice(0, 5);
            await this.enrichWorkloadsWithAssignee(this.recentWorkloads);
            // Logs — independiente
            const logs = await this.http.get(`${this.apiUrl}/workload-logs?limit=5`)
                .toPromise().catch(() => []);
            this.recentLogs = (logs || []).slice(0, 5);
            // Comentarios — independiente
            const comments = await this.http.get(`${this.apiUrl}/comments/recent?limit=5`)
                .toPromise().catch(() => ({ data: [] }));
            this.recentComments = (comments?.data || []).slice(0, 5);
            await this.enrichCommentsWithAuthors(this.recentComments);
        }
        catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }
    // ========== USERS ==========
    async loadAllUsers() {
        try {
            const users = await this.http.get(`${this.apiUrl}/users`).toPromise();
            this.allUsers = users || [];
        }
        catch (error) {
            console.error('Error loading users:', error);
        }
    }
    async saveUser() {
        // Validación mínima en frontend
        const f = this.userForm;
        if (!f.nombre || !f.paterno || !f.fechaNacimiento || !f.domicilio ||
            !f.codigoPostal || !f.estado || !f.pais || !f.passwordEncrypt) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        const payload = {
            nombre: f.nombre,
            paterno: f.paterno,
            materno: f.materno || '',
            fechaNacimiento: f.fechaNacimiento,
            domicilio: f.domicilio,
            nss: f.nss || '0',
            codigoPostal: f.codigoPostal,
            estado: f.estado,
            pais: f.pais,
            passwordEncrypt: f.passwordEncrypt,
            tipoUsuario: this.roleMap[f.tipoUsuarioStr], // 'USER' → 1
            activo: 1,
            fechaRegistro: new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'
        };
        try {
            await this.http.post(`${this.apiUrl}/auth/register`, payload).toPromise();
            alert('Usuario creado exitosamente');
            this.showUserForm = false;
            this.userForm = {
                nombre: '', paterno: '', materno: '',
                fechaNacimiento: '', domicilio: '', nss: '',
                codigoPostal: '', estado: '', pais: '',
                passwordEncrypt: '', tipoUsuarioStr: 'USER', activo: 1
            };
            this.loadAllUsers();
            this.loadDashboard();
        }
        catch (error) {
            console.error('Error saving user:', error);
            // Muestra el mensaje real que devuelve el backend
            const msg = error?.error?.errors?.[0]?.msg // error de validateCreateUser
                || error?.error?.msg // error del controlador
                || 'Error al crear usuario';
            alert(msg);
        }
    }
    // Reemplaza el editUser() actual
    editUser(userId) {
        this.editingUserId = userId;
        const user = this.allUsers.find(u => u.userId === userId);
        if (!user)
            return;
        this.editForm = {
            nombre: user.nombre,
            paterno: user.paterno,
            materno: user.materno,
            fechaNacimiento: user.fechaNacimiento?.toString().split('T')[0] || '',
            domicilio: user.domicilio,
            nss: user.nss,
            codigoPostal: user.codigoPostal,
            estado: user.estado,
            pais: user.pais,
            tipoUsuarioNum: user.tipoUsuario, // ya viene como número del GET
            passwordEncrypt: '' // vacío — solo se actualiza si se llena
        };
        this.showEditForm = true;
    }
    async saveEditUser() {
        if (!this.editingUserId)
            return;
        // Token del localStorage (requerido por verifyAdmin)
        const token = localStorage.getItem('token');
        const payload = {
            nombre: this.editForm.nombre,
            paterno: this.editForm.paterno,
            materno: this.editForm.materno,
            fechaNacimiento: this.editForm.fechaNacimiento,
            domicilio: this.editForm.domicilio,
            nss: this.editForm.nss,
            codigoPostal: this.editForm.codigoPostal,
            estado: this.editForm.estado,
            pais: this.editForm.pais,
            tipoUsuario: Number(this.editForm.tipoUsuarioNum),
            activo: 1,
            fechaRegistro: new Date().toISOString().split('T')[0]
        };
        // Solo incluir password si se escribió algo
        if (this.editForm.passwordEncrypt?.trim()) {
            payload.passwordEncrypt = this.editForm.passwordEncrypt;
        }
        try {
            await this.http.put(`${this.apiUrl}/users/update/${this.editingUserId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).toPromise();
            alert('Usuario actualizado exitosamente');
            this.showEditForm = false;
            this.editingUserId = null;
            this.loadAllUsers();
        }
        catch (error) {
            console.error('Error updating user:', error);
            const msg = error?.error?.message || 'Error al actualizar usuario';
            alert(msg);
        }
    }
    async toggleUserStatus(userId, currentStatus) {
        const newStatus = currentStatus === 1 ? 0 : 1;
        try {
            await this.http.put(`${this.apiUrl}/users/${userId}`, { activo: newStatus }).toPromise();
            alert(`Usuario ${newStatus === 1 ? 'activado' : 'desactivado'}`);
            this.loadAllUsers();
            this.loadDashboard();
        }
        catch (error) {
            console.error('Error toggling user status:', error);
            alert('Error al cambiar estado del usuario');
        }
    }
    // ========== WORKLOADS ==========
    async loadWorkloads() {
        try {
            let url = `${this.apiUrl}/workloads`;
            const params = new URLSearchParams();
            if (this.filters.status)
                params.append('status', this.filters.status);
            if (this.filters.priority)
                params.append('priority', this.filters.priority);
            if (this.filters.assigned_to)
                params.append('assigned_to', String(this.filters.assigned_to));
            if (params.toString())
                url += `?${params.toString()}`;
            const workloads = await this.http.get(url).toPromise();
            this.workloads = workloads || [];
            await this.enrichWorkloadsWithAssignee(this.workloads);
        }
        catch (error) {
            console.error('Error loading workloads:', error);
        }
    }
    async createWorkload() {
        if (!this.workloadForm.title) {
            alert('El título es requerido');
            return;
        }
        try {
            await this.http.post(`${this.apiUrl}/workloads`, {
                title: this.workloadForm.title,
                description: this.workloadForm.description,
                priority: this.workloadForm.priority,
                assigned_to: this.workloadForm.assigned_to,
                due_date: this.workloadForm.due_date,
                created_by: this.currentUserId
            }).toPromise();
            alert('Tarea creada exitosamente');
            this.showWorkloadForm = false;
            this.workloadForm = {
                title: '',
                description: '',
                priority: 'MEDIUM',
                assigned_to: null,
                due_date: ''
            };
            this.loadWorkloads();
            this.loadDashboard();
        }
        catch (error) {
            console.error('Error creating workload:', error);
            alert('Error al crear tarea');
        }
    }
    async viewWorkloadDetail(workloadId) {
        try {
            const workload = await this.http.get(`${this.apiUrl}/workloads/${workloadId}`).toPromise();
            this.selectedWorkload = workload || null;
            if (this.selectedWorkload) {
                await this.enrichWorkloadsWithAssignee([this.selectedWorkload]);
            }
            const commentsRes = await this.http.get(`${this.apiUrl}/comments/workload/${workloadId}`).toPromise();
            this.workloadComments = commentsRes?.data || [];
            await this.enrichCommentsWithAuthors(this.workloadComments);
            const logs = await this.http.get(`${this.apiUrl}/workload-logs?workload_id=${workloadId}`).toPromise();
            this.workloadLogs = logs || [];
            this.currentView = 'taskdetail';
        }
        catch (error) {
            console.error('Error loading workload detail:', error);
            alert('Error al cargar detalle de la tarea');
        }
    }
    async deleteWorkload(workloadId) {
        if (!confirm('¿Eliminar esta tarea?'))
            return;
        try {
            await this.http.request('DELETE', `${this.apiUrl}/workloads/${workloadId}`, {
                body: { performed_by: this.currentUserId },
                headers: { 'Content-Type': 'application/json' }
            }).toPromise();
            alert('Tarea eliminada');
            this.loadWorkloads();
            this.loadDashboard();
        }
        catch (error) {
            console.error('Error deleting workload:', error);
            alert(error?.error?.msg || 'Error al eliminar tarea');
        }
    }
    async updateWorkloadStatus(workloadId, event) {
        const select = event.target;
        const newStatus = select.value;
        try {
            await this.http.put(`${this.apiUrl}/workloads/${workloadId}`, {
                status: newStatus,
                performed_by: this.currentUserId
            }).toPromise();
            alert('Estado actualizado');
            this.loadMyWorkloads();
            this.loadDashboard();
        }
        catch (error) {
            console.error('Error updating workload status:', error);
            alert('Error al actualizar estado');
        }
    }
    // ========== COMMENTS ==========
    async addCommentToWorkload() {
        if (!this.newComment || !this.selectedWorkload)
            return;
        try {
            await this.http.post(`${this.apiUrl}/comments`, {
                workload_id: this.selectedWorkload.id,
                user_id: this.currentUserId,
                content: this.newComment
            }).toPromise();
            alert('Comentario agregado');
            this.newComment = '';
            this.viewWorkloadDetail(this.selectedWorkload.id);
        }
        catch (error) {
            console.error('Error adding comment:', error);
            alert('Error al agregar comentario');
        }
    }
    async addQuickComment() {
        if (!this.quickComment || this.myWorkloads.length === 0) {
            alert('No tienes tareas asignadas o el comentario está vacío');
            return;
        }
        try {
            await this.http.post(`${this.apiUrl}/comments`, {
                workload_id: this.myWorkloads[0].id,
                user_id: this.currentUserId,
                content: this.quickComment
            }).toPromise();
            alert('Comentario agregado');
            this.quickComment = '';
            this.loadMyComments();
        }
        catch (error) {
            console.error('Error adding quick comment:', error);
            alert('Error al agregar comentario');
        }
    }
    async loadAllComments() {
        try {
            const res = await this.http.get(`${this.apiUrl}/comments/recent?limit=20`).toPromise();
            this.allComments = res?.data || [];
            await this.enrichCommentsWithAuthors(this.allComments);
            await this.enrichCommentsWithWorkloadTitles(this.allComments);
        }
        catch (error) {
            console.error('Error loading comments:', error);
        }
    }
    // ========== LOGS ==========
    async loadAllLogs() {
        try {
            const logs = await this.http.get(`${this.apiUrl}/workload-logs?limit=50`).toPromise();
            this.allLogs = logs || [];
        }
        catch (error) {
            console.error('Error loading logs:', error);
        }
    }
    // ========== USER PANEL ==========
    async loadMyWorkloads() {
        try {
            const workloads = await this.http.get(`${this.apiUrl}/workloads?assigned_to=${this.currentUserId}`).toPromise();
            this.myWorkloads = workloads || [];
            await this.enrichWorkloadsWithAssignee(this.myWorkloads);
        }
        catch (error) {
            console.error('Error loading my workloads:', error);
        }
    }
    async loadMyComments() {
        try {
            const res = await this.http.get(`${this.apiUrl}/comments/recent?limit=10`).toPromise();
            const allComments = res?.data || [];
            this.myComments = allComments.filter(c => c.user_id === String(this.currentUserId));
            await this.enrichCommentsWithAuthors(this.myComments);
        }
        catch (error) {
            console.error('Error loading my comments:', error);
        }
    }
    // ========== HELPER METHODS ==========
    async enrichWorkloadsWithAssignee(workloads) {
        if (!workloads.length)
            return;
        try {
            const users = await this.http.get(`${this.apiUrl}/users`).toPromise();
            const userMap = new Map();
            (users || []).forEach(user => userMap.set(user.userId, user));
            workloads.forEach(workload => {
                const assignee = workload.assigned_to ? userMap.get(workload.assigned_to) : null;
                workload.assigneeName = assignee ? `${assignee.nombre} ${assignee.paterno}` : 'Sin asignar';
            });
        }
        catch (error) {
            console.error('Error enriching workloads with assignee:', error);
        }
    }
    async enrichCommentsWithAuthors(comments) {
        if (!comments.length)
            return;
        try {
            const users = await this.http.get(`${this.apiUrl}/users`).toPromise();
            const userMap = new Map();
            (users || []).forEach(user => userMap.set(user.userId, user));
            comments.forEach(comment => {
                const author = userMap.get(Number(comment.user_id));
                comment.authorName = author ? `${author.nombre} ${author.paterno}` : 'Usuario desconocido';
            });
        }
        catch (error) {
            console.error('Error enriching comments with authors:', error);
        }
    }
    async enrichCommentsWithWorkloadTitles(comments) {
        if (!comments.length)
            return;
        try {
            const workloads = await this.http.get(`${this.apiUrl}/workloads`).toPromise();
            const workloadMap = new Map();
            (workloads || []).forEach(workload => workloadMap.set(workload.id, workload));
            comments.forEach(comment => {
                const workload = workloadMap.get(comment.workload_id);
                comment.workloadTitle = workload?.title || 'N/A';
            });
        }
        catch (error) {
            console.error('Error enriching comments with workload titles:', error);
        }
    }
};
PanelAdminComponent = __decorate([
    Component({
        selector: 'app-panel-admin',
        standalone: true,
        imports: [CommonModule, FormsModule, HttpClientModule],
        templateUrl: './panel-admin.component.html',
        styleUrls: ['./panel-admin.component.scss']
    })
], PanelAdminComponent);
export { PanelAdminComponent };
//# sourceMappingURL=panel-admin.component.js.map