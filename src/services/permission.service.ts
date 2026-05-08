// src/app/auth/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { permissions } from '../../shared/dto/permission.dto';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class permissionsService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'permissions';
  }

  getAll(): Observable<permissions[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}/`;
    return this.http.get<permissions[]>(url);
  }

  updatePermissions(userId:number, permissions: permissions[]): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.put(url, permissions);
  }

  getUserInfo(userId: number): Observable<permissions[]> {
    return this.http.get<permissions[]>(`${this.myAppUrl}${this.myApiUrl}/getUser/${userId}`);
  }

  getUserById(userId: number){
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/getUserById/${userId}`);
  }

}