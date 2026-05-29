import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

export interface Workload {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_by: string;
  assigned_to: string;
  due_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserworkService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'userworks/';
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  }

  getMyWorkloads(): Observable<Workload[]> {
    return this.http.get<Workload[]>(`${this.myAppUrl}${this.myApiUrl}`, this.getHeaders());
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.myAppUrl}${this.myApiUrl}${id}/status`, { status }, this.getHeaders());
  }
}