import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

export interface Comment {
  id: number;
  workload_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {
  private readonly myAppUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
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

  getComments(workloadId: number): Observable<any> {
    return this.http.get<any>(
      `${this.myAppUrl}comments/workload/${workloadId}`,
      this.getHeaders()
    );
  }

  createComment(workloadId: number, content: string): Observable<any> {
    const user_id = this.getUserId();
    return this.http.post<any>(
      `${this.myAppUrl}comments`,
      { workload_id: workloadId, user_id, content },
      this.getHeaders()
    );
  }
}