import { name, version } from "../package.json";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HarvestClientWrapper } from '../src/harvest-client';
import { ClientTool } from "./tools/clients";

const harvestAccountId = process.env.HARVEST_ACCOUNT_ID;
const harvestAccessToken = process.env.HARVEST_ACCESS_TOKEN;
const harvestBaseURL = process.env.HARVEST_BASE_URL || "https://api.harvestapp.com/v2";

if (!harvestAccessToken) {
	console.error("HARVEST_ACCESS_TOKEN is required");
	process.exit(1);
}

if(!harvestAccountId) {
    console.error("HARVEST_ACCOUNT_ID is required");
    process.exit(1);
}

// Create an MCP server
const server = new McpServer({
    name,
    version,
});

// Register the Harvest Client
const client = new HarvestClientWrapper({
    baseURL: harvestBaseURL,
    accessToken: harvestAccessToken,
    accountId: harvestAccountId,
});

// Init the tools
new ClientTool(client, server).register();

async function main() {
    try {
        const transport = new StdioServerTransport();
		await server.connect(transport);
    } catch(error) {
        console.error("[Server Fatal Error]:", error);
        process.exit(1);    
    }
}


main();
