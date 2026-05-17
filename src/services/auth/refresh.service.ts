import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'auth/refresh';
  }
  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.myAppUrl}${this.myApiUrl}`,{}, {withCredentials: true});
  }

}