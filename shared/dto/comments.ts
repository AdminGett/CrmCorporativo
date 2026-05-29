// Interfaz para los comentarios de las tareas
export interface Comment {
    id?: number;
    userComment: number;
    taskComment: number;
    commentText: string;
    submitedAt: string;
}