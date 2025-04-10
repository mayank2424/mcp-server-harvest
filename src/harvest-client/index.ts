import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { HarvestClient, HarvestCompany, HarvestProject, HarvestUser } from './types/response';
import type { SearchClientInputs, SearchProjectInputs } from './types/request';

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

    async getCompanyInfo() {
        const response = await this.client.get('/company');
        const company: HarvestCompany = response?.data;

        return company;
    }

    async searchClients(searchInputs: SearchClientInputs) {
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

    async getClient(clientId: number) {
        const response = await this.client.get(`/clients/${clientId}`);
        const client: HarvestClient = response?.data;

        if (!client) return null;

        return client;
    }

    async searchProjects(searchInputs: SearchProjectInputs) {
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

    async getProject(projectId: number) {
        const response = await this.client.get(`/projects/${projectId}`);
        const project: HarvestProject = response?.data;

        if (!project) return null;

        return project;
    }

    async listUsers() {
        const response = await this.client.get('/users');
        const users: HarvestUser[] = response?.data?.users || [];
        const total = response?.data?.total_entries;

        return { users, total }
    }

    async getUser(userId: number) {
        const response = await this.client.get(`/users/${userId}`);
        const user: HarvestUser = response?.data;

        if (!user) return null;

        return user;
    }

}
