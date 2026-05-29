// error.service.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) {} 

  msjError(e: HttpErrorResponse) {
    console.log('Error recibido:', e); 
    
    if (e.error?.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else if (e.message) {
      this.toastr.error(e.message, 'Error');
    } else {
      this.toastr.error(
        'Ups ocurrió un error, comuníquese con el administrador',
        'Error'
      );
    }
  }
}