import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// DTOs del frontend (shared)// 
import { workloadDTO } from '../../shared/dto/workload.dto';
import { commentDTO } from '../../shared/dto/comment.dto';

@Injectable({
  providedIn: 'root',
})
export class componentWorkloadService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(
    private readonly http: HttpClient
  ) {

    this.myAppUrl = environment.endpoint;

    // Coincide con:
    // this.app.use('/api/componentWorkload', componentWorkloadRouter);

    this.myApiUrl = 'api/componentWorkload';
  }

  getWorkloadByUser(
    userId: number
  ): Observable<workloadDTO[]> {

    return this.http.get<workloadDTO[]>(
      `${this.myAppUrl}${this.myApiUrl}/user/${userId}`
    );
  }

  filterTasks(
    filters: {
      userId?: number;
      status?: string;
      priority?: string;
      search?: string;
    }
  ): Observable<workloadDTO[]> {

    let query = '?';

    if (filters.userId) {
      query += `userId=${filters.userId}&`;
    }

    if (filters.status) {
      query += `status=${filters.status}&`;
    }

    if (filters.priority) {
      query += `priority=${filters.priority}&`;
    }

    if (filters.search) {
      query += `search=${filters.search}&`;
    }

    return this.http.get<workloadDTO[]>(
      `${this.myAppUrl}${this.myApiUrl}/filter${query}`
    );
  }

  createWorkloadTask(
    task: workloadDTO
  ): Observable<any> {

    const body = {

      userAssignedId:
        task.userAssignedId,

      title:
        task.title,

      descriptionTask:
        task.descriptionTask,

      dateDue:
        new Date(task.dateDue).toISOString(),

      statusTask:
        task.statusTask,

      priority:
        task.priority
    };

    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}`,
      body
    );
  }
 
  getCommentsByTask(
    taskId: number
  ): Observable<commentDTO[]> {

    return this.http.get<commentDTO[]>(
      `${this.myAppUrl}${this.myApiUrl}/comments/task/${taskId}`
    );
  }


  getCommentsByUser(
    userId: number
  ): Observable<commentDTO[]> {

    return this.http.get<commentDTO[]>(
      `${this.myAppUrl}${this.myApiUrl}/comments/user/${userId}`
    );
  }

  filterComments(
    filters: {
      userId?: number;
      taskId?: number;
      search?: string;
    }
  ): Observable<commentDTO[]> {

    let query = '?';

    if (filters.userId) {
      query += `userId=${filters.userId}&`;
    }

    if (filters.taskId) {
      query += `taskId=${filters.taskId}&`;
    }

    if (filters.search) {
      query += `search=${filters.search}&`;
    }

    return this.http.get<commentDTO[]>(
      `${this.myAppUrl}${this.myApiUrl}/comments/filter${query}`
    );
  }

  createComment(
    comment: commentDTO
  ): Observable<any> {

    const body = {

      userComment:
        comment.userComment,

      taskComment:
        comment.taskComment,

      commentText:
        comment.commentText
    };

    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/comments`,
      body
    );
  }
}