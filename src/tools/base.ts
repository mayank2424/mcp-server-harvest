import type { HarvestClientWrapper } from "@/harvest-client";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Base class for all tools.
 * 
 * @class
 */
export class BaseTool {
	constructor(protected client: HarvestClientWrapper) {}

	protected toResult(content: string): CallToolResult {
		return { content: [{ type: "text", text: content }] };
	}
}
