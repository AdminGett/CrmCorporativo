export interface workloadDTO {

    id?: number;

    userAssignedId: number;

    title: string;

    descriptionTask: string;

    dateDue: Date | string;

    submintedAt?: Date | string;

    statusTask:
        | 'pending'
        | 'in_progress'
        | 'completed';

    priority:
        | 'low'
        | 'medium'
        | 'high';

    createdAt?: Date | string;

    updatedAt?: Date | string;
}