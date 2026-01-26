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
    this.myApiUrl = 'auth/register'
  }

  signIn(user: Register): Observable<any> {
    const body = {
      nombre: user.nombre,
      paterno: user.paterno,
      materno: user.materno,
      fechaNacimiento: new Date(user.fechaNacimiento).toISOString(),
      domicilio: user.domicilio,
      nss: user.nss,
      codigoPostal: user.codigoPostal,
      estado: user.estado,
      pais: user.pais,
      fechaRegistro: new Date(user.fechaRegistro).toISOString(),
      tipoUsuario: user.tipoUsuario,
      passwordEncrypt: user.passwordEncrypt,
      activo: user.activo
    }
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }
}