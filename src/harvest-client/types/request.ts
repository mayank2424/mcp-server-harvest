/**
 * Interface for the request body of the search client endpoint.
 */
export interface SearchClientInputs {
    name?: string;
    isActive?: boolean;
}

/**
 * Interface for the request body of the search project endpoint.
 */
export interface SearchProjectInputs {
    clientId?: number;
    name?: string;
    isActive?: boolean;
}

/**
 * Interface for the request body of the search time entry endpoint.
 */
export interface SearchTimeEntryInputs {
    projectId?: number;
    clientId?: number;
    userId?: number;
    taskId?: number;
    fromDate?: string;
    toDate?: string;
}

/**
 * Interface for the request body of the create time entry endpoint.
 */
export interface CreateTimeEntryInputs {
    projectId: number;
    taskId: number;
    userId: number;
    date: string;
    hours: number;
    notes?: string;
}
