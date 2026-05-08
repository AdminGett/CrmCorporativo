// Se define la interfaz para las permisos de un usuario, que incluye el ID del usuario, el ID del permiso, si el permiso está permitido o no, y una descripción del permiso, lo que permite estructurar los datos relacionados con los permisos de manera clara y consistente para su uso en la gestión de permisos dentro del sistema 
export interface permissions {
    userId: number,
    permissionId: number,
    allowed: number
    permissionsCatalog: {
        clave: string,
        descripcion: string
    }
}