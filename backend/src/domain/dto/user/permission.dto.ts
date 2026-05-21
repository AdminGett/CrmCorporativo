// Exportamos la interfaz permissions que representa los datos relacionados con los permisos de un usuario
export interface permissions {
    userId: number,
    permissionId: number,
    allowed: number,
    permissionCatalog: {
        clave: string,
        descripcion: string
    }
}