import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class  userService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'users';
  }

  getUserName(userId: number){
    return this.http.get<{nombre:string, tipoUsuario: number}>(`${this.myAppUrl}${this.myApiUrl}/${userId}`);
  }

}