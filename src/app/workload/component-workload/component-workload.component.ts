import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { workloadDTO } from 'shared/dto/workload.dto';
import { commentDTO } from 'shared/dto/comment.dto';
import { createCommentDTO } from 'shared/dto/createComment.dto';
import { Router } from '@angular/router';

import { componentWorkloadService } from '../../../services/workloas/componentWorkload.Service';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from 'shared/dto/payload';


@Component({
  selector: 'app-component-workload',

  standalone: false,
  templateUrl:
    './component-workload.component.html',

  styleUrls:
    ['./component-workload.component.scss'],
})

export class componentWorkloadComponent
implements OnInit {

  tasksList: workloadDTO[] = [];

  filteredTasksList: workloadDTO[] = [];

  commentsList: commentDTO[] = [];

  selectedTask: workloadDTO | null = null;

  currentUserId: number | null = null;

  statusFilter: string = '';

  priorityFilter: string = '';

  // BUSQUEDAS
  searchTask: string = '';

  searchComment: string = '';

  // NUEVO COMENTARIO
  newCommentText: string = '';

  // MÉTRICAS
  totalTasks: number = 0;

  pendingTasks: number = 0;

  progressTasks: number = 0;

  completedTasks: number = 0;


  constructor(

    private readonly _workloadService:
      componentWorkloadService,
      private readonly router:Router
  ) {}

  ngOnInit(): void {

    this.obtenerTareas();
    this.checkExistingToken();
  }

  private checkExistingToken(): void {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp > currentTime) {
            this.currentUserId = decoded.userId
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

  obtenerTareas(): void {
    if(this.currentUserId === null) return;
    this._workloadService
      .getWorkloadByUser(
        this.currentUserId
      )
      .subscribe({

        next: (
          data: workloadDTO[]
        ) => {

          this.tasksList = data;

          this.filteredTasksList = data;

          this.calcularMetricas();
        },

        error: (err: any) => {

          console.error(
            'Error cargando tareas:',
            err
          );
        }
      });
  }

  calcularMetricas(): void {

    this.totalTasks =
      this.tasksList.length;


    this.pendingTasks =
      this.tasksList.filter(

        task =>
          task.statusTask ===
          'pending'

      ).length;


    this.progressTasks =
      this.tasksList.filter(

        task =>
          task.statusTask ===
          'in_progress'

      ).length;


    this.completedTasks =
      this.tasksList.filter(

        task =>
          task.statusTask ===
          'completed'

      ).length;
  }


  aplicarFiltros(): void {

    this.filteredTasksList =
      this.tasksList.filter(task => {

        const matchStatus =
          this.statusFilter
            ? task.statusTask ===
              this.statusFilter
            : true;


        const matchPriority =
          this.priorityFilter
            ? task.priority ===
              this.priorityFilter
            : true;

        const matchSearch =
          this.searchTask
            ? task.title
                .toLowerCase()
                .includes(
                  this.searchTask.toLowerCase()
                )
            : true;

        return (
          matchStatus &&
          matchPriority &&
          matchSearch
        );
      });
  }


  seleccionarTarea(
    task: workloadDTO
  ): void {

    this.selectedTask = task;

    this.newCommentText = '';


    if (task.id) {

      this.cargarComentarios(
        task.id
      );
    }
  }

  

  cargarComentarios(
    taskId: number
  ): void {

    this._workloadService
      .getCommentsByTask(taskId)
      .subscribe({

        next: (
          data: commentDTO[]
        ) => {

          this.commentsList = data;
        },

        error: (err: any) => {

          console.error(
            'Error cargando comentarios:',
            err
          );
        }
      });
  }


  mostrarComentariosUsuario(): void {
    if(this.currentUserId === null) return;

    this._workloadService
      .getCommentsByUser(
        this.currentUserId
      )
      .subscribe({

        next: (
          data: commentDTO[]
        ) => {

          this.commentsList = data;
        },

        error: (err: any) => {

          console.error(
            'Error cargando comentarios del usuario:',
            err
          );
        }
      });
  }

  buscarComentarios(): void {

    if (!this.searchComment.trim()) {

      if (this.selectedTask?.id) {

        this.cargarComentarios(
          this.selectedTask.id
        );
      }

      return;
    }

    this.commentsList =
      this.commentsList.filter(comment =>

        comment.commentText
          .toLowerCase()
          .includes(
            this.searchComment.toLowerCase()
          )
      );
  }


  agregarComentario(): void {

    if (
      !this.newCommentText.trim() ||
      !this.selectedTask?.id ||
      this.currentUserId === null
    ) {
      return;
    }


    const comentario:
      createCommentDTO = {

      userComment:
        this.currentUserId,

      taskComment:
        this.selectedTask.id,

      commentText:
        this.newCommentText
    };


    this._workloadService
      .createComment(comentario)
      .subscribe({

        next: () => {

          this.newCommentText = '';


          if (this.selectedTask?.id) {

            this.cargarComentarios(
              this.selectedTask.id
            );
          }
        },

        error: (err: any) => {

          console.error(
            'Error al guardar comentario:',
            err
          );
        }
      });
  }
}