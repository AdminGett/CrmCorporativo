import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserworkService, Workload } from '../../services/userwork.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  imports: [CommonModule],
})
export class UserTaskComponent implements OnInit {
  tareas: Workload[] = [];
  activas: Workload[] = [];
  finalizadas: Workload[] = [];
  cargando = true;
  usuarioId: string = '—';

  tareaSeleccionada: Workload | null = null;

  constructor(
    private readonly userworkService: UserworkService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioId = String(this.userworkService.getUserId());
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.cargando = true;
    this.userworkService.getMyWorkloads().subscribe({
      next: (data) => {
        this.tareas      = data;
        this.activas     = data.filter(t => t.status !== 'DONE');
        this.finalizadas = data.filter(t => t.status === 'DONE');
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    this.userworkService.updateStatus(id, nuevoEstado).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al cambiar estado:', err)
    });
  }

  getBtnLabel(status: string): string {
    if (status === 'PENDING')     return 'Iniciar';
    if (status === 'IN_PROGRESS') return 'Completar';
    if (status === 'DONE')        return 'Reabrir';
    return '';
  }

  getNextStatus(status: string): string {
    if (status === 'PENDING')     return 'IN_PROGRESS';
    if (status === 'IN_PROGRESS') return 'DONE';
    if (status === 'DONE')        return 'PENDING';
    return '';
  }

  revertirTarea(id: number): void {
    this.userworkService.updateStatus(id, 'PENDING').subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al revertir tarea:', err)
    });
  }

  getPriorityLabel(priority: string): string {
    if (priority === 'HIGH')   return 'ALTA';
    if (priority === 'MEDIUM') return 'MEDIA';
    if (priority === 'LOW')    return 'BAJA';
    return priority;
  }

  getPriorityClass(priority: string): string {
    if (priority === 'HIGH')   return 'pri-high';
    if (priority === 'MEDIUM') return 'pri-medium';
    return 'pri-low';
  }

  getStatusLabel(status: string): string {
    const map: any = { PENDING: 'PENDIENTE', IN_PROGRESS: 'EN PROGRESO', DONE: 'COMPLETADA' };
    return map[status] || status;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  irAComentariosSinTarea(): void {
    if (this.activas.length > 0) {
      this.router.navigate(['/userTasks', this.activas[0].id, 'comments']);
    } else if (this.tareas.length > 0) {
      this.router.navigate(['/userTasks', this.tareas[0].id, 'comments']);
    }
  }

  get totalPending():  number { return this.tareas.filter(t => t.status === 'PENDING').length; }
  get totalProgress(): number { return this.tareas.filter(t => t.status === 'IN_PROGRESS').length; }
  get totalDone():     number { return this.finalizadas.length; }
}