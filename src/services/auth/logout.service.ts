import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'auth/logout';
  }

  
  logout(): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this.myAppUrl}${this.myApiUrl}`, {}, { withCredentials: true });
  }

}