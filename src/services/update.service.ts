// src/app/auth/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../../shared/dto/register.dto';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class updateService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'users';
  }

  getAll(): Observable<Register[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}/`;
    return this.http.get<Register[]>(url);
  }

  searchByName(name: string): Observable<Register[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}/search?search=${encodeURIComponent(name.trim())}`;
    return this.http.get<Register[]>(url);
  }

  updateUser(userId:number, users: Register): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/update/${userId}`;
    return this.http.put(url, users);
  }

  getUserInfo(userId: number): Observable<Register> {
    return this.http.get<Register>(`${this.myAppUrl}${this.myApiUrl}/update/getUser/${userId}`);
  }
}