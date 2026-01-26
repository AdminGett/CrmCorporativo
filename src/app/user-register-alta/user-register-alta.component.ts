import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';
import { Register } from '../../../shared/dto/register.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './user-register-alta.component.html',
  standalone: false,
  styleUrls: ['./user-register-alta.component.scss']
})
export class userRegisterAltaComponent implements OnInit {
  confirmPassword: string = '';
  passwordEncrypt: string = '';
  nombre: string = '';
  paterno: string = '';
  materno: string = '';
  fechaNacimiento: Date = new Date('2000-01-01');
  domicilio: string = '';
  nss: string = '';
  codigoPostal: string = '';
  estado: string = '';
  pais: string = '';
  fechaRegistro: Date = new Date();
  tipoUsuario: number = 0;
  activo: number = 1;

  adminOption: number = 3;
  loading: boolean = false;

  constructor(
    private readonly toastr: ToastrService,
    private readonly _userService: RegisterService,
    private readonly router: Router,
    private readonly _errorService: ErrorService
  ) { }

  ngOnInit(): void { }

  togglePassword(inputId: string, toggleId: string) {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement | null;
    const toggleButton = document.getElementById(toggleId);

    if (passwordInput && toggleButton) {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleButton.classList.toggle('show-password', isPassword);
      toggleButton.classList.toggle('hide-password', !isPassword);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.passwordEncrypt !== this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.addUser();
  }

  async addUser() {
  if (this.passwordEncrypt !== this.confirmPassword) {
    this.toastr.error('Las contraseñas no coinciden', 'Error');
    return;
  }

    if (
      this.nombre.trim() === '' ||
      this.paterno.trim() === '' ||
      this.materno.trim() === '' ||
      this.fechaNacimiento === null ||
      this.domicilio.trim() === '' ||
      this.nss.trim() === '' ||
      this.codigoPostal.trim() === '' ||
      this.estado.trim() === '' ||
      this.pais.trim() === '' ||
      this.confirmPassword.trim() === '' ||
      this.fechaRegistro === null ||
      this.tipoUsuario === 0 ||
      this.activo === 0
    ) {
      console.log('');
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.passwordEncrypt !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }


    if (this.adminOption === 1) {
      this.tipoUsuario = 1;
    } 

    this.loading = true;

    try {
      const user: Register = {
        userId: 0, // Asignar un valor predeterminado o generar uno según la lógica de tu aplicación
        passwordEncrypt: this.passwordEncrypt,
        nombre: this.nombre,
        paterno: this.paterno,
        materno: this.materno,
        fechaNacimiento: this.fechaNacimiento,
        domicilio: this.domicilio,
        nss: this.nss,
        codigoPostal: this.codigoPostal,
        estado: this.estado,
        pais: this.pais,
        fechaRegistro: this.fechaRegistro,
        tipoUsuario: this.tipoUsuario,
        activo: 1
      };

      // Llamar al servicio pasando el archivo por separado
      this._userService.signIn(user).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastr.success(`El usuario ${this.nombre} registrado con éxito`, 'Registro exitoso');
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      });
    } catch (error) {
      this.loading = false;
      this.toastr.error('Error al procesar el registro', 'Error');
      console.error('Error:', error);
    }
  }

  public clearInputs(): void {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach((input: any) => {
      input.value = '';
    });
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input: any) => {
      input.value = '';
    });
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input: any) => {
      input.value = '';
    });
  }
}