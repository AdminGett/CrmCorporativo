export interface Register {
    userId?: number;
    passwordEncrypt: string;
    nombre: string;
    paterno: string;
    materno: string;
    fechaNacimiento: Date;
    domicilio: string;
    nss: string;
    codigoPostal: string;
    estado: string;
    pais: string;
    fechaRegistro: Date;
    tipoUsuario: number;
    activo?: number;
}