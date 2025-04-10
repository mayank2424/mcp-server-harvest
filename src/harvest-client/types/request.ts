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
