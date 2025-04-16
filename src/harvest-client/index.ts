import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { HarvestClient, HarvestCompany, HarvestProject, HarvestTaskAssignment, HarvestTimeEntry, HarvestUser, HarvestUserAssignment } from './types/response';
import type { CreateTimeEntryInputs, SearchClientInputs, SearchProjectInputs, SearchTimeEntryInputs } from './types/request';

interface HarvestClientOptions {
    baseURL?: string;
    accessToken: string;
    accountId: string;
}

export class HarvestClientWrapper {
    private client!: AxiosInstance;

    constructor(private readonly options: HarvestClientOptions) {
        if (!options.accessToken) {
            throw new Error('accessToken is required');
        }

        if (!options.accountId) {
            throw new Error('accountId is required');
        }

        this.setupClient();
        this.setupClientInterceptors();
    }

    private setupClient() {
        this.client = axios.create({
            baseURL: this.options.baseURL || 'https://api.harvestapp.com/v2',
            headers: {
                Authorization: `Bearer ${this.options.accessToken}`,
                'Harvest-Account-Id': this.options.accountId,
                'Content-Type': 'application/json',
            }
        });
    }

    private setupClientInterceptors() {
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                console.error('Error in Harvest API request:', error);
                return Promise.reject(error);
            }
        )
    }

    async getCompanyInfo(): Promise<HarvestCompany> {
        const response = await this.client.get('/company');
        const company: HarvestCompany = response?.data;

        return company;
    }

    async searchClients(searchInputs: SearchClientInputs): Promise<{ clients: HarvestClient[]; total: number }> {
        const { name, isActive } = searchInputs;

        const response = await this.client.get('/clients', {
            params: {
                name: name || undefined,
                is_active: isActive || undefined,
            }
        });

        const clients: HarvestClient[] = response?.data?.clients || [];
        const total = response?.data?.total_entries;

        return { clients, total }
    }

    async getClient(clientId: number): Promise<HarvestClient | null> {
        const response = await this.client.get(`/clients/${clientId}`);
        const client: HarvestClient = response?.data;

        if (!client) return null;

        return client;
    }

    async searchProjects(searchInputs: SearchProjectInputs): Promise<{ projects: HarvestProject[]; total: number }> {
        const { clientId, name, isActive } = searchInputs;

        const response = await this.client.get('/projects', {
            params: {
                client_id: clientId || undefined,
                name: name || undefined,
                is_active: isActive || undefined,
            }
        });
        const projects: HarvestProject[] = response?.data?.projects || [];
        const total = response?.data?.total_entries;

        return { projects, total }
    }

    async getProject(projectId: number): Promise<HarvestProject | null> {
        const response = await this.client.get(`/projects/${projectId}`);
        const project: HarvestProject = response?.data;

        if (!project) return null;

        return project;
    }

    async listUsers(): Promise<{ users: HarvestUser[]; total: number }> {
        const response = await this.client.get('/users');
        const users: HarvestUser[] = response?.data?.users || [];
        const total = response?.data?.total_entries;

        return { users, total }
    }

    async getUser(userId: number): Promise<HarvestUser | null> {
        const response = await this.client.get(`/users/${userId}`);
        const user: HarvestUser = response?.data;

        if (!user) return null;

        return user;
    }

    async listProjectUserAssignments(projectId: number): Promise<{ userAssignments: HarvestUserAssignment[]; total: number }> {
        const response = await this.client.get(`/projects/${projectId}/user_assignments`);

        const userAssignments: HarvestUserAssignment[] = response?.data?.user_assignments || [];
        const total = response?.data?.total_entries;

        return { userAssignments, total }
    }

    async listProjectTaskAssignments(projectId: number): Promise<{ taskAssignments: HarvestTaskAssignment[]; total: number }> {
        const response = await this.client.get(`/projects/${projectId}/task_assignments`);

        const taskAssignments: HarvestTaskAssignment[] = response?.data?.task_assignments || [];
        const total = response?.data?.total_entries;

        return { taskAssignments, total }
    }

    async searchTimeEntries(searchInputs: SearchTimeEntryInputs): Promise<{ timeEntries: HarvestTimeEntry[]; total: number }> {
        const { userId, projectId, clientId, taskId } = searchInputs;

        const response = await this.client.get('/time_entries', {
            params: {
                user_id: userId || undefined,
                project_id: projectId || undefined,
                client_id: clientId || undefined,
                task_id: taskId || undefined,
            }
        });

        const timeEntries = response?.data?.time_entries || [];
        const total = response?.data?.total_entries;

        return { timeEntries, total }
    }

    async createTimeEntry(searchInputs: CreateTimeEntryInputs): Promise<HarvestTimeEntry | null> {
        const { projectId, taskId, date, hours, userId, notes } = searchInputs;

        const response = await this.client.post('/time_entries', {
            project_id: projectId,
            task_id: taskId,
            user_id: userId || undefined,
            spent_date: date,
            hours: hours,
            notes: notes || undefined,
        });

        const timeEntry: HarvestTimeEntry = response?.data;
        if (!timeEntry) return null;

        return timeEntry;
    }

    async getTask(taskId: number): Promise<HarvestTaskAssignment | null> {
        const response = await this.client.get(`/tasks/${taskId}`);
        const task: HarvestTaskAssignment = response?.data;

        if (!task) return null;

        return task;
    }

    async getTimeEntry(timeEntryId: number): Promise<HarvestTimeEntry | null> {
        const response = await this.client.get(`/time_entries/${timeEntryId}`);
        const timeEntry: HarvestTimeEntry = response?.data;

        if (!timeEntry) return null;

        return timeEntry;
    }


}
