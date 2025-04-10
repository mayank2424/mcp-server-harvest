import type { HarvestClientWrapper } from "@/harvest-client";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseTool } from "./base";

/**
 * MCP Tool for Harvest Client
 */
export class CompanyTool extends BaseTool {
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
        // get-company tool
        this.server.tool(
            'get-company',
            "Get company information",
            {},
            async () => {
                return this.getCompanyInfo();
            }
        )
    }

    /**
     * Get Company Information
     * 
     * @returns - The company information
     */
    async getCompanyInfo() {
        const company = await this.client.getCompanyInfo();
        return this.toResult(`Company Name: ${company.name}\nCompany URL: ${company.base_uri}\nCompany Domain: ${company.full_domain}\nCompany Currency: ${company.currency}`);
    }
}   
