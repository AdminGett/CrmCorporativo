// Se define la interfaz para el payload del token JWT, que incluye el ID del usuario, el nombre de usuario, el rol y la fecha de expiración del token, lo que permite estructurar los datos que se incluirán en el token de manera clara y consistente para su uso en la autenticación y autorización de usuarios en el sistema
export interface TokenPayload {
  userId: number;
  username: string;
  role: string;
  exp: number;
}