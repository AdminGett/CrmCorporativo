import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../../shared/dto/login.dto';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'auth/login';
  }

  login(user: Login): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.myAppUrl}${this.myApiUrl}`, user, { withCredentials: true });
  }


}