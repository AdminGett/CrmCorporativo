import { __decorate } from "tslib";
import { Component } from '@angular/core';
let userRegisterAltaComponent = class userRegisterAltaComponent {
    constructor(toastr, _userService, router, _errorService) {
        this.toastr = toastr;
        this._userService = _userService;
        this.router = router;
        this._errorService = _errorService;
        this.confirmPassword = '';
        this.passwordEncrypt = '';
        this.nombre = '';
        this.paterno = '';
        this.materno = '';
        this.fechaNacimiento = new Date('2000-01-01');
        this.domicilio = '';
        this.nss = '';
        this.codigoPostal = '';
        this.estado = '';
        this.pais = '';
        this.fechaRegistro = new Date();
        this.tipoUsuario = 0;
        this.activo = 1;
        this.userId = 0;
        this.adminOption = 3;
        this.loading = false;
        this.showPassword = false;
    }
    ngOnInit() {
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    handleSubmit(event) {
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
        if (this.nombre.trim() === '' ||
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
            this.activo === 0) {
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
            const user = {
                userId: this.userId, // Asignar un valor predeterminado o generar uno según la lógica de tu aplicación
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
                error: (e) => {
                    this.loading = false;
                    this._errorService.msjError(e);
                }
            });
        }
        catch (error) {
            this.loading = false;
            this.toastr.error('Error al procesar el registro', 'Error');
            console.error('Error:', error);
        }
    }
    clearInputs() {
        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach((input) => {
            input.value = '';
        });
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach((input) => {
            input.value = '';
        });
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach((input) => {
            input.value = '';
        });
    }
};
userRegisterAltaComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './user-register-alta.component.html',
        standalone: false,
        styleUrls: ['./user-register-alta.component.scss']
    })
], userRegisterAltaComponent);
export { userRegisterAltaComponent };
//# sourceMappingURL=user-register-alta.component.js.map