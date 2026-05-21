// Se define la interfaz para el proceso de registro de un nuevo usuario, que incluye información personal y de contacto, así como detalles relacionados con la cuenta, lo que permite estructurar los datos de entrada de manera clara y consistente para el controlador que maneja la creación de nuevos usuarios en el sistema
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
