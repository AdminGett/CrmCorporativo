export interface workLoad {
    id?: number;
    userAssignedId?: number;
    title: string;
    descriptionTask: string;
    dateDue: string;
    submintedAt: string;
    statusTask: 'pending' | 'in_progress' | 'completed' | 'canceled';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
}
