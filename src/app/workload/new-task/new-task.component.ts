import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { workLoad } from 'shared/dto/workload';
import { ErrorService } from 'src/services/auth/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkloadService } from '../../../services/workloas/workload.service';
import {Comment } from 'shared/dto/comments';
import { CommentsService } from 'src/services/workloas/comments.service';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from 'shared/dto/payload';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  standalone: false
})
export class NewTaskComponent implements OnInit {

   userInfo: any = null;
    userId: number | null = null;
  
    statusTask: number = 0;
    title: string = '';
    descriptionTask: string = '';
    dueDate: Date = new Date();
    priority: number = 0;
    loading: boolean = false;
    submintedAt: Date = new Date();
    userAssignedId: number = 0;
  
    userComment: number = 0;
    taskComment: number = 0;
    commentText: string = '';
    submitedAt: string = '';
  

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly _workloadService: WorkloadService,
    private readonly _errorService: ErrorService,
    private readonly routes: ActivatedRoute,
    private readonly _commentsService:CommentsService
  ) {}

  ngOnInit() { 
    this.checkExistingToken();
  }

  private checkExistingToken(): void {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp > currentTime) {
            this.userInfo = decoded;
            this.userAssignedId = decoded.userId
            return;
          } else {
            localStorage.removeItem('accessToken');
            this.router.navigate(['/']);
          }
        } catch (error) {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/']);
        }
      }
    }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.createTask();
  }

  async createTask() {
    if (
      this.title.trim() === '' ||
      this.descriptionTask.trim() === '' ||
      this.dueDate === null ||
      this.statusTask === 0 ||
      this.priority === 0 ||
      this.submintedAt === null
    ) {
      console.log('');
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    this.loading = true;
    try {
      const task: workLoad = {
        userAssignedId: this.userAssignedId,
        title: this.title,
        descriptionTask: this.descriptionTask,
        dateDue: this.formatDate(this.dueDate),
        statusTask: this.getStatus(this.statusTask),
        priority: this.getPriority(this.priority),
        submintedAt: this.formatDate(this.submintedAt)
      };
      this._workloadService.createTask(task).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastr.success(`La tarea ${this.title} creada con éxito`, 'Creación exitosa');
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);

        }
      });

    } catch (error) {
      this.loading = false;
      this.toastr.error('Error al procesar el registro', 'Error');
      console.error('Error:', error);
    }
  }

  formatDate(date: Date) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  getStatus(tipo: number): 'pending' | 'in_progress' | 'completed' | 'canceled' {
    const nivel: Record<number, 'pending' | 'in_progress' | 'completed' | 'canceled'> = {
      1: 'pending',
      2: 'in_progress',
      3: 'completed',
      4: 'canceled',
    };
    return nivel[tipo];
  }

  getPriority(priority: number): 'high' | 'medium' | 'low' {
    const nivel: Record<number, 'high' | 'medium' | 'low'> = {
      1: 'high',
      2: 'medium',
      3: 'low',
    };

    return nivel[priority];
  }

  showDatePicker(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.showPicker){
    input.showPicker();
    }
  }
}
