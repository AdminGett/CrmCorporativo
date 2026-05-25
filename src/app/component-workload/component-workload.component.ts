import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { workloadDTO } from 'shared/dto/workload.dto';
import { commentDTO } from 'shared/dto/comment.dto';
import {createCommentDTO } from 'shared/dto/createComment.dto';
import { componentWorkloadService } from 'src/services/componentWorkload.Service';


@Component({
  selector: 'app-component-workload',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

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

  currentUserId: number = 5;

  statusFilter: string = '';

  priorityFilter: string = '';

  newCommentText: string = '';

  totalTasks: number = 0;

  pendingTasks: number = 0;

  progressTasks: number = 0;

  completedTasks: number = 0;


  constructor(

    private readonly _workloadService:
      componentWorkloadService

  ) {}

  ngOnInit(): void {

    this.obtenerTareas();
  }

  obtenerTareas(): void {

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


        return (
          matchStatus &&
          matchPriority
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

  agregarComentario(): void {

    if (
      !this.newCommentText.trim() ||
      !this.selectedTask?.id
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