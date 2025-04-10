import type { HarvestClientWrapper } from "@/harvest-client";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseTool } from "./base";
import { z } from "zod";
import { formatProjectsList, formatProjectTaskAssignmentsList, formatProjectUserAssignmentsList } from "@/utils/format";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export class ProjectTool extends BaseTool {
    constructor(
        client: HarvestClientWrapper,
        private server: McpServer,
    ) {
        super(client);
    }

    register() {
        // search-projects tool
        this.server.tool(
            'search-projects',
            "Search for projects in Harvest Account",
            {
                clientId: z.number().optional().describe("ID of the client to search for"),
                name: z.string().optional().describe("Search for projects by name"),
                isActive: z.boolean().optional().describe("Search for active projects"),
            },
            async ({ clientId, name, isActive }) => this.searchProjects({ clientId, name, isActive })
        )

        // get-project tool
        this.server.tool(
            'get-project',
            "Get a project by ID",
            {
                projectId: z.string().describe("ID of the project to get"),
            },
            async ({ projectId }) => {
                return this.getProject(projectId);
            }
        )

        // list-project-users tool
        this.server.tool(
            'list-project-users',
            "List users assigned to a project",
            {
                projectId: z.string().describe("ID of the project to list users for"),
            },
            async ({ projectId }) => this.listProjectUsers(projectId)
        )

        // list-project-tasks tool
        this.server.tool(
            'list-project-tasks',
            "List tasks assigned to a project",
            {
                projectId: z.string().describe("ID of the project to list tasks for"),
            },
            async ({ projectId }) => this.listProjectTasks(projectId)
        )
    }

    /**
     * Search Projects in Harvest Account
     * 
     * @param clientId - ID of the client to search for
     * @param name - Name of the project to search for
     * @param isActive - Whether to search for active projects
     * 
     * @returns - A list of projects that match the search criteria
     */
    async searchProjects({
        clientId,
        name,
        isActive
    }: {
        clientId?: number;
        name?: string;
        isActive?: boolean;
    }): Promise<CallToolResult> {
        const { projects, total } = await this.client.searchProjects({
            clientId,
            name,
            isActive
        });

        if (!projects) {
            throw new Error("Failed to search projects");
        }

        if (!projects.length) {
            return this.toResult("Result: No projects found");
        }

        return this.toResult(
            `Result: ${total} projects found: 
            ${formatProjectsList(projects)}
        `);
    }

    /**
     * Get a project by ID
     * 
     * @param projectId - ID of the project to get
     * 
     * @returns - The project with the specified ID
     */
    async getProject(projectId: string): Promise<CallToolResult> {
        const project = await this.client.getProject(Number(projectId));

        if (!project) {
            return this.toResult(`Result: Project not found with this ID ${projectId}`);
        }

        return this.toResult(
            `Result: Project found:\n**ID**: ${project.id}\n**Name**: ${project.name}\n**Is Active**: ${project.is_active}\n**Is Billable**: ${project.is_billable}\n**Hourly Rate**: ${project.hourly_rate || "N/A"}\n
        `)
    }

    /**
     * List project user assignments
     * 
     * @param projectId - ID of the project to list users for
     * 
     * @returns - A list of users assigned to the project
     */
    async listProjectUsers(projectId: string): Promise<CallToolResult> {
        const { userAssignments, total } = await this.client.listProjectUserAssignments(Number(projectId));

        if (!userAssignments.length) {
            return this.toResult(`Result: No users found for project ${projectId}`);
        }

        return this.toResult(`Result: ${total} users found for project ${projectId}\n ${formatProjectUserAssignmentsList(userAssignments)}`);
    }

    /**
     * List project task assignments
     * 
     * @param projectId - ID of the project to list tasks for
     * 
     * @returns - A list of tasks assigned to the project
     */
    async listProjectTasks(projectId: string): Promise<CallToolResult> {
        const { taskAssignments, total } = await this.client.listProjectTaskAssignments(Number(projectId));

        if (!taskAssignments.length) {
            return this.toResult(`Result: No tasks found for project ${projectId}`);
        }

        return this.toResult(`Result: ${total} tasks found for project ${projectId}\n${formatProjectTaskAssignmentsList(taskAssignments)}`);
    }

}
