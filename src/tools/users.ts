import type { HarvestClientWrapper } from "@/harvest-client";
import { BaseTool } from "./base";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { formatUsersList } from "@/utils/format";
import { z } from "zod";

export class UserTool extends BaseTool {
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
        // list-users tool
        this.server.tool(
            'list-users',
            "List all users in Harvest Account",
            {},
            async () => {
                return this.listUsers();
            }
        )

        // get-user tool
        this.server.tool(
            'get-user',
            "Get a user by ID",
            {
                userId: z.string().describe("ID of the user to get"),
            },
            async ({ userId }) => this.getUser(userId)
        )
    }

    async listUsers() {
        const { users, total } = await this.client.listUsers();

        if (!users.length) {
            return this.toResult(`Result: No users found`);
        }

        return this.toResult(`Result: ${total} users found\n\n` + formatUsersList(users));

    }

    async getUser(userId: string) {
        const user = await this.client.getUser(Number(userId));

        if (!user) {
            return this.toResult(`Result: User not found`);
        }

        return this.toResult(`Result: User found\n\n` + formatUsersList([user]));
    }
}
