// Se define la interfaz para el proceso de inicio de sesión, que incluye el ID del usuario y la contraseña encriptada, lo que permite estructurar los datos de entrada de manera clara y consistente para el controlador que maneja la autenticación
export interface Login {
    id: string,
    passwordEncrypt: string
}