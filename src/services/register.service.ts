import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Register } from '../../shared/dto/register.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'users/register'
  }

  signIn(user: Register, avatarFile?: File): Observable<any> {
    const formData = new FormData();
    // Agregar todos los campos del usuario
    formData.append('nombre', user.nombre);
    formData.append('paterno', user.paterno);
    formData.append('materno', user.materno);
    formData.append('fechaNacimiento', user.fechaNacimiento.toISOString());
    formData.append('domicilio', user.domicilio);
    formData.append('nss', user.nss);
    formData.append('codigoPostal', user.codigoPostal);
    formData.append('estado', user.estado);
    formData.append('pais', user.pais);
    formData.append('fechaRegistro', user.fechaRegistro.toISOString());
    formData.append('tipoUsuario', user.tipoUsuario.toString());
    
    // Agregar el archivo si existe
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, formData);
  }
}