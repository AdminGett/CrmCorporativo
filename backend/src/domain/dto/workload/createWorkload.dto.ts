export interface createWorkloadDTO {
    userAssignedId: number;
    title: string;
    descriptionTask: string;
    dateDue: string | Date;

    statusTask:
        | 'pending'
        | 'in_progress'
        | 'completed';

    priority:
        | 'low'
        | 'medium'
        | 'high';
}