import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../../shared/dto/register.dto';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class deleteService {
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

  deleteProduct(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    return this.http.delete(url);
  }

  searchByName(name: string): Observable<Register[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}/search?search=${encodeURIComponent(name.trim())}`;
    console.log('URL de búsqueda:', url);
    return this.http.get<Register[]>(url);
  }
}