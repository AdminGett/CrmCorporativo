export interface createWorkloadDTO {

    userAssignedId: number;

    title: string;

    descriptionTask: string;

    dateDue: Date;

    statusTask:
        | 'pending'
        | 'in_progress'
        | 'completed';

    priority:
        | 'low'
        | 'medium'
        | 'high';
}