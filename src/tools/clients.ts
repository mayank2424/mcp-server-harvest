import type { HarvestClientWrapper } from "@/harvest-client";
import { BaseTool } from "./base";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { formatClientsList } from "@/utils/format";


/**
 * MCP Tool for Harvest Client
 * 
 * @class ClientTool
 */
export class ClientTool extends BaseTool {
    constructor(
        client: HarvestClientWrapper,
        private server: McpServer,
    ) {
        super(client);
    }

    /**
     * Initialize the tool with the Harvest Client and MCP Server
     * 
     * @param client - The Harvest Client wrapper
     * @param server - The MCP Server instance
     */
    register() {
         // search-clients tool
        this.server.tool(
            'search-clients',
            "Search for clients in Harvest Account",
            {
                name: z.string().optional().describe("Search for clients by name"),
                isActive: z.boolean().optional().describe("Search for active clients"),
            },
            async ({ name, isActive }) => {
                return this.searchClients({ name, isActive });
            }
        )

        // get-client tool
        this.server.tool(
            'get-client',
            "Get a client by ID",
            {
                clientId: z.string().describe("ID of the client to get"),
            },
            async ({ clientId }) => {
                return this.getClient(clientId);
            }
        )
    }

    /**
     * Search Clients in Harvest Account
     * 
     * @param name - Name of the client to search for
     * @param isActive - Whether to search for active clients
     * 
     * @returns - A list of clients that match the search criteria
     */
    async searchClients({
        name,
        isActive
    }: {
        name?: string;
        isActive?: boolean;
    }): Promise<CallToolResult> {
        const { total, clients } = await this.client.searchClients({
            name,
            isActive
        });

        if (!clients) {
            throw new Error("Failed to search clients")
        }

        if (!clients.length) {
            return this.toResult("Result: No clients found");
        }

        return this.toResult(
            `Result: ${total} clients found: 
            ${formatClientsList(clients)}
        `);
    }

    async getClient(clientId: string): Promise<CallToolResult> {
        const client = await this.client.getClient(Number(clientId));
        if(!client) {
            return this.toResult(`Result: No client found with this ID ${clientId}`);
        }

        return this.toResult(
            `ID: ${client.id}\n**Name**: ${client.name}\n**Is Active**: ${client.is_active}\n**Currency**: ${client.currency || "N/A"}
        `);
    }
}
