import { jwtDecode } from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface User {
  userId: number;
  passwordEncrypt: string;
  nombre: string;
  paterno: string;
  materno: string;
  fechaNacimiento: string;
  domicilio: string;
  nss: string;
  codigoPostal: string;
  estado: string;
  pais: string;
  fechaRegistro: string;
  tipoUsuario: 'ADMIN' | 'USER' | 'MEDICO';
  activo: number;
}

interface Workload {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: number | null;
  created_by: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  assigneeName?: string;
}

interface WorkloadLog {
  id: string;
  workload_id: string;
  action: string;
  old_value: any;
  new_value: any;
  performed_by: string;
  timestamp: string;
}

interface Comment {
  id: string;
  workload_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  authorName?: string;
  workloadTitle?: string;
}

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api';
  
  currentUserId: number = 0;
  currentUserEmail = '';
  currentUserRole = 'ADMIN';
  currentView = 'dashboard';

  stats = {
    totalUsers: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0
  };

  // Propiedades de usuarios
  allUsers: User[] = [];
  recentUsers: User[] = [];
  searchUser = '';

  // Propiedades de workloads
  workloads: Workload[] = [];
  recentWorkloads: Workload[] = [];
  showWorkloadForm = false;
  searchWorkload = ''; // Buscador de workloads en tiempo real
  
  workloadForm = {
    title: '',
    description: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
    assigned_to: null as number | null,
    due_date: ''
  };
  
  filters = {
    status: '',
    priority: '',
    assigned_to: null as number | null
  };

  // Autocomplete para asignar usuario
  assigneeInput = '';
  assigneeSuggestions: User[] = [];

  // Propiedades de detalle de tarea
  selectedWorkload: Workload | null = null;
  workloadComments: Comment[] = [];
  workloadLogs: WorkloadLog[] = [];
  newComment = '';

  // Propiedades de edición de workload
  showEditWorkloadForm = false;
  editWorkloadForm: any = {};

  // Propiedades de logs y comentarios
  allLogs: WorkloadLog[] = [];
  recentLogs: WorkloadLog[] = [];
  allComments: Comment[] = [];
  recentComments: Comment[] = [];

  // Validaciones
  todayDate: string = new Date().toISOString().split('T')[0];
  dueDateError: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  // Getter para filtrar usuarios - Busca por nombre, apellido o ID
  get filteredUsers(): User[] {
    if (!this.searchUser.trim()) return this.allUsers;
    const term = this.searchUser.toLowerCase();
    return this.allUsers.filter(u =>
      u.nombre.toLowerCase().includes(term) ||
      u.paterno.toLowerCase().includes(term) ||
      u.materno?.toLowerCase().includes(term) ||
      u.userId.toString().includes(term)
    );
  }

  // Getter para filtrar workloads en tiempo real
  get filteredWorkloads(): Workload[] {
    if (!this.searchWorkload.trim()) return this.workloads;
    const term = this.searchWorkload.toLowerCase();
    return this.workloads.filter(w =>
      w.title.toLowerCase().includes(term) ||
      w.assigneeName?.toLowerCase().includes(term) ||
      w.id.toString().includes(term) ||
      w.status.toLowerCase().includes(term) ||
      w.priority.toLowerCase().includes(term)
    );
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.currentUserId = decoded.userId;
        this.currentUserEmail = decoded.userId?.toString() || '';
      } catch (e) {
        this.toastr.error('Token inválido', 'Error de autenticación');
      }
    }
    this.loadDashboard();
  }

  showView(view: string): void {
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
    }
  }

  async loadDashboard(): Promise<void> {
    try {
      const users = await this.http.get<User[]>(`${this.apiUrl}/users`).toPromise().catch(() => []);
      const userList = users || [];
      this.stats.totalUsers = userList.length;
      this.recentUsers = userList.slice(0, 5);

      const workloads = await this.http.get<Workload[]>(`${this.apiUrl}/workloads`).toPromise().catch(() => []);
      const workloadList = workloads || [];
      this.stats.totalTasks = workloadList.length;
      this.stats.pendingTasks = workloadList.filter(w => w.status === 'PENDING').length;
      this.stats.completedTasks = workloadList.filter(w => w.status === 'DONE').length;
      this.recentWorkloads = workloadList.slice(0, 5);
      await this.enrichWorkloadsWithAssignee(this.recentWorkloads);

      const logs = await this.http.get<WorkloadLog[]>(`${this.apiUrl}/workload-logs?limit=5`).toPromise().catch(() => []);
      this.recentLogs = (logs || []).slice(0, 5);

      const comments = await this.http.get<{ data: Comment[] }>(`${this.apiUrl}/comments/recent?limit=5`).toPromise().catch(() => ({ data: [] }));
      this.recentComments = (comments?.data || []).slice(0, 5);
      await this.enrichCommentsWithAuthors(this.recentComments);

    } catch (error: any) {
      this.toastr.error('Error al cargar el dashboard', 'Error');
    }
  }

  async loadAllUsers(): Promise<void> {
    try {
      const users = await this.http.get<User[]>(`${this.apiUrl}/users`).toPromise();
      this.allUsers = users || [];
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al cargar usuarios';
      this.toastr.error(msg, 'Error');
    }
  }

  async loadWorkloads(): Promise<void> {
    try {
      let url = `${this.apiUrl}/workloads`;
      const params = new URLSearchParams();
      if (this.filters.status) params.append('status', this.filters.status);
      if (this.filters.priority) params.append('priority', this.filters.priority);
      if (params.toString()) url += `?${params.toString()}`;

      const workloads = await this.http.get<Workload[]>(url).toPromise();
      this.workloads = workloads || [];
      await this.enrichWorkloadsWithAssignee(this.workloads);
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al cargar tareas';
      this.toastr.error(msg, 'Error');
    }
  }

  validateDueDate(): boolean {
    if (this.workloadForm.due_date) {
      const dueDate = new Date(this.workloadForm.due_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        this.dueDateError = 'La fecha límite no puede ser menor a la fecha actual';
        this.toastr.warning(this.dueDateError, 'Validación');
        return false;
      }
      
      this.dueDateError = '';
      return true;
    }
    return true;
  }

  // Autocomplete para asignar usuario al crear tarea
  onAssigneeInput(): void {
    const term = this.assigneeInput.toLowerCase().trim();
    if (!term) {
      this.assigneeSuggestions = [];
      return;
    }
    this.assigneeSuggestions = this.allUsers.filter(u =>
      u.nombre.toLowerCase().includes(term) ||
      u.paterno.toLowerCase().includes(term) ||
      u.userId.toString().includes(term)
    ).slice(0, 5);
  }

  selectAssignee(user: User): void {
    this.assigneeInput = `${user.nombre} ${user.paterno}`;
    this.workloadForm.assigned_to = user.userId;
    this.assigneeSuggestions = [];
  }

  clearAssignee(): void {
    this.assigneeInput = '';
    this.workloadForm.assigned_to = null;
    this.assigneeSuggestions = [];
  }

  cancelWorkloadForm(): void {
    this.showWorkloadForm = false;
    this.workloadForm = {
      title: '',
      description: '',
      priority: 'MEDIUM',
      assigned_to: null,
      due_date: ''
    };
    this.assigneeInput = '';
    this.assigneeSuggestions = [];
    this.dueDateError = '';
  }

  async createWorkload(): Promise<void> {
    if (!this.workloadForm.title) {
      this.toastr.warning('El título es requerido', 'Validación');
      return;
    }

    if (!this.validateDueDate()) {
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

      this.toastr.success('Tarea creada exitosamente', 'Éxito');
      this.cancelWorkloadForm();
      this.loadWorkloads();
      this.loadDashboard();
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al crear tarea';
      this.toastr.error(msg, 'Error');
    }
  }

  async viewWorkloadDetail(workloadId: string): Promise<void> {
    try {
      await this.loadAllUsers();
      
      const workload = await this.http.get<Workload>(`${this.apiUrl}/workloads/${workloadId}`).toPromise();
      this.selectedWorkload = workload || null;
      if (this.selectedWorkload) {
        await this.enrichWorkloadsWithAssignee([this.selectedWorkload]);
      }

      const commentsRes = await this.http.get<{ data: Comment[] }>(`${this.apiUrl}/comments/workload/${workloadId}`).toPromise();
      this.workloadComments = commentsRes?.data || [];
      await this.enrichCommentsWithAuthors(this.workloadComments);

      const logs = await this.http.get<WorkloadLog[]>(`${this.apiUrl}/workload-logs?workload_id=${workloadId}`).toPromise();
      this.workloadLogs = logs || [];

      this.currentView = 'taskdetail';
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al cargar detalle de la tarea';
      this.toastr.error(msg, 'Error');
    }
  }

  async deleteWorkload(workloadId: string): Promise<void> {
    if (!confirm('¿Eliminar esta tarea?')) return;

    try {
      await this.http.request('DELETE', `${this.apiUrl}/workloads/${workloadId}`, {
        body: { performed_by: this.currentUserId },
        headers: { 'Content-Type': 'application/json' }
      }).toPromise();

      this.toastr.success('Tarea eliminada exitosamente', 'Éxito');
      this.loadWorkloads();
      this.loadDashboard();
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al eliminar tarea';
      this.toastr.error(msg, 'Error');
    }
  }

  editWorkload(): void {
    if (!this.selectedWorkload) return;
    this.editWorkloadForm = {
      title: this.selectedWorkload.title,
      description: this.selectedWorkload.description || '',
      priority: this.selectedWorkload.priority,
      status: this.selectedWorkload.status,
      assigned_to: this.selectedWorkload.assigned_to,
      due_date: this.selectedWorkload.due_date?.toString().split('T')[0] || ''
    };
    this.showEditWorkloadForm = true;
  }

  async saveEditWorkload(): Promise<void> {
    if (!this.selectedWorkload) return;

    if (!this.editWorkloadForm.title) {
      this.toastr.warning('El título es requerido', 'Validación');
      return;
    }

    try {
      await this.http.put(`${this.apiUrl}/workloads/${this.selectedWorkload.id}`, {
        title: this.editWorkloadForm.title,
        description: this.editWorkloadForm.description,
        priority: this.editWorkloadForm.priority,
        status: this.editWorkloadForm.status,
        assigned_to: this.editWorkloadForm.assigned_to,
        due_date: this.editWorkloadForm.due_date,
        performed_by: this.currentUserId
      }).toPromise();

      this.toastr.success('Tarea actualizada exitosamente', 'Éxito');
      this.showEditWorkloadForm = false;
      this.viewWorkloadDetail(this.selectedWorkload.id);
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al actualizar tarea';
      this.toastr.error(msg, 'Error');
    }
  }

  async addCommentToWorkload(): Promise<void> {
    if (!this.newComment) {
      this.toastr.warning('El comentario no puede estar vacío', 'Validación');
      return;
    }
    
    if (!this.selectedWorkload) return;

    try {
      await this.http.post(`${this.apiUrl}/comments`, {
        workload_id: this.selectedWorkload.id,
        user_id: this.currentUserId,
        content: this.newComment
      }).toPromise();

      this.toastr.success('Comentario agregado exitosamente', 'Éxito');
      this.newComment = '';
      this.viewWorkloadDetail(this.selectedWorkload.id);
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al agregar comentario';
      this.toastr.error(msg, 'Error');
    }
  }

  async loadAllComments(): Promise<void> {
    try {
      const res = await this.http.get<{ data: Comment[] }>(`${this.apiUrl}/comments/recent?limit=20`).toPromise();
      this.allComments = res?.data || [];
      await this.enrichCommentsWithAuthors(this.allComments);
      await this.enrichCommentsWithWorkloadTitles(this.allComments);
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al cargar comentarios';
      this.toastr.error(msg, 'Error');
    }
  }

  async loadAllLogs(): Promise<void> {
    try {
      const logs = await this.http.get<WorkloadLog[]>(`${this.apiUrl}/workload-logs?limit=50`).toPromise();
      this.allLogs = logs || [];
    } catch (error: any) {
      const msg = error?.error?.msg || error?.error?.errors?.[0]?.msg || 'Error al cargar logs';
      this.toastr.error(msg, 'Error');
    }
  }

  private async enrichWorkloadsWithAssignee(workloads: Workload[]): Promise<void> {
    if (!workloads.length) return;

    try {
      const users = await this.http.get<User[]>(`${this.apiUrl}/users`).toPromise();
      const userMap = new Map<number, User>();
      (users || []).forEach(user => userMap.set(user.userId, user));

      workloads.forEach(workload => {
        const assignee = workload.assigned_to ? userMap.get(workload.assigned_to) : null;
        workload.assigneeName = assignee ? `${assignee.nombre} ${assignee.paterno}` : 'Sin asignar';
      });
    } catch (error) {
      console.error('Error en enrichWorkloadsWithAssignee:', error);
    }
  }

  private async enrichCommentsWithAuthors(comments: Comment[]): Promise<void> {
    if (!comments.length) return;

    try {
      const users = await this.http.get<User[]>(`${this.apiUrl}/users`).toPromise();
      const userMap = new Map<number, User>();
      (users || []).forEach(user => userMap.set(user.userId, user));

      comments.forEach(comment => {
        const author = userMap.get(Number(comment.user_id));
        comment.authorName = author ? `${author.nombre} ${author.paterno}` : 'Usuario desconocido';
      });
    } catch (error) {
      console.error('Error en enrichCommentsWithAuthors:', error);
    }
  }

  private async enrichCommentsWithWorkloadTitles(comments: Comment[]): Promise<void> {
    if (!comments.length) return;

    try {
      const workloads = await this.http.get<Workload[]>(`${this.apiUrl}/workloads`).toPromise();
      const workloadMap = new Map<string, Workload>();
      (workloads || []).forEach(workload => workloadMap.set(workload.id, workload));

      comments.forEach(comment => {
        const workload = workloadMap.get(comment.workload_id);
        comment.workloadTitle = workload?.title || 'N/A';
      });
    } catch (error) {
      console.error('Error en enrichCommentsWithWorkloadTitles:', error);
    }
  }
}