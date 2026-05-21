export interface workLoad {
    id: number;
    userAssignedId: number;
    adminId: number;
    title: string;
    descriptionTask: string;
    dateDue: Date;
    submintedAt: Date;
    statusTask: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
}
