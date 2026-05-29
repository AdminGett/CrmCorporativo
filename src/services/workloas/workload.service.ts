import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { workLoad } from '../../../shared/dto/workload';

@Injectable({
  providedIn: 'root'
})
export class WorkloadService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'workloads';
  }

  createTask(task: workLoad): Observable<any> {
    const body = {
      userAssignedId: task.userAssignedId,
      title: task.title,
      descriptionTask: task.descriptionTask,
      dateDue: task.dateDue,
      statusTask: task.statusTask,
      priority: task.priority,
      submintedAt: task.submintedAt

    }
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/newTask`, body);
  }

  getTasksByUserId(userAssignedId: number): Observable<workLoad[]> {
    return this.http.get<workLoad[]>(`${this.myAppUrl}${this.myApiUrl}/getTasks/${userAssignedId}`);
  }

  getTaskById(id: number): Observable<workLoad> {
    return this.http.get<workLoad>(`${this.myAppUrl}${this.myApiUrl}/getTask/${id}`);
  }

  editTask(id: number, task: workLoad): Observable<any> {
    const body = {
      userAssignedId: task.userAssignedId,
      title: task.title,
      descriptionTask: task.descriptionTask,
      dateDue: task.dateDue,
      statusTask: task.statusTask,
      priority: task.priority,
      submintedAt: task.submintedAt
    }
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updateTask/${id}`, body);
  }

  deleteTask(id:number): Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deleteTask/${id}`);
  }

  changeStatus(id:number, statusTask:string): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/changeStatus/${id}`,{statusTask});
  }
}