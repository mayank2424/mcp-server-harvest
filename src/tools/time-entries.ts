import { BaseTool } from "./base";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { HarvestClientWrapper } from "@/harvest-client";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { formatTimeEntryList } from "@/utils/format";

export class TimEntryTool extends BaseTool {
    constructor(
        client: HarvestClientWrapper,
        private server: McpServer,
    ) {
        super(client);
    }

    register() {
        // search-time-entries tool
        this.server.tool(
            'search-time-entries',
            "Search for time entries in Harvest Account",
            {
                projectId: z.string().optional().describe("ID of the project to search for"),
                taskId: z.string().optional().describe("ID of the task to search for"),
                userId: z.string().optional().describe("ID of the user to search for"),
                clientId: z.string().optional().describe("ID of the client to search for"),
                from: z.string().optional().describe("Start date to search from"),
                to: z.string().optional().describe("End date to search to"),
            },
            async ({ projectId, taskId, userId, clientId, from, to }) => this.searchTimeEntries({ projectId, taskId, userId, clientId, from, to })
        )

        // create-time-entry tool
        this.server.tool(
            'create-time-entry',
            "Create a time entry in Harvest Account",
            {
                projectId: z.string().describe("ID of the project to create time entry for"),
                taskId: z.string().describe("ID of the task to create time entry for"),
                userId: z.string().describe("ID of the user to create time entry for"),
                date: z.string().describe("Date of the time entry"),
                hours: z.number().describe("Number of hours worked"),
                notes: z.string().optional().describe("Notes for the time entry"),
            },
            async ({ projectId, taskId, userId, date, hours, notes }) => this.createTimeEntry({ projectId, taskId, userId, date, hours, notes })
        )

        // get-time-entry tool
        this.server.tool(
            'get-time-entry',
            "Get a time entry in Harvest Account",
            {
                timeEntryId: z.string().describe("ID of the time entry to get"),
            },
            async ({ timeEntryId }) => this.getTimeEntry(timeEntryId)
        )
    }

    async searchTimeEntries({
        projectId,
        taskId,
        userId,
        clientId,
        from,
        to,
    }: {
        projectId?: string;
        taskId?: string;
        userId?: string;
        clientId?: string;
        from?: string;
        to?: string;
    }): Promise<CallToolResult> {
        const { timeEntries, total } = await this.client.searchTimeEntries({
            projectId: projectId ? parseInt(projectId) : undefined,
            taskId: taskId ? parseInt(taskId) : undefined,
            userId: userId ? parseInt(userId) : undefined,
            clientId: clientId ? parseInt(clientId) : undefined,
            fromDate: from,
            toDate: to,
        });


        if (!timeEntries.length) {
            return this.toResult(`Result: No time entries found`);
        }

        return this.toResult(`Result: ${total} time entries found: ${formatTimeEntryList(timeEntries)}`);
    }

    async getTimeEntry(timeEntryId: string): Promise<CallToolResult> {
        const timeEntry = await this.client.getTimeEntry(parseInt(timeEntryId));
        if (!timeEntry) {
            return this.toResult(`Result: Time entry with ID ${timeEntryId} not found`);
        }

        return this.toResult(`Result: Time entry found: ${formatTimeEntryList([timeEntry])}`);
    }

    async createTimeEntry({
        projectId,
        taskId,
        userId,
        date,
        hours,
        notes,
    }: {
        projectId: string;
        taskId: string;
        userId: string;
        date: string;
        hours: number;
        notes?: string;
    }) {
        if (!projectId) {
            throw Error(`Please provide a project ID`);
        }

        if (!taskId) {
            throw Error(`Please provide a task ID`);
        }

        if (!userId) {
            throw Error(`Please provide a user ID`);
        }

        const project = await this.client.getProject(parseInt(projectId));
        if (!project) {
            return this.toResult(`Result: Project with ID ${projectId} not found`);
        }

        const task = await this.client.getTask(parseInt(taskId));
        if (!task) {
            return this.toResult(`Result: Task with ID ${taskId} not found`);
        }

        const user = await this.client.getUser(parseInt(userId));
        if (!user) {
            return this.toResult(`Result: User with ID ${userId} not found`);
        }

        const timeEntry = await this.client.createTimeEntry({
            projectId: project.id,
            taskId: task.id,
            userId: user.id,
            date,
            hours,
            notes,
        });

        if (!timeEntry) {
            return this.toResult(`Result: Failed to create time entry`);
        }

        return this.toResult(`Result: Time entry created successfully: ID: ${timeEntry.id}`);

    }
}
