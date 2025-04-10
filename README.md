# Harvest Time Tracking MCP Server

A TypeScript based MCP (Model Context Protocol) server for Harvest time tracking app enabling LLM clients to interact with Harvest account.

## Prerequisites

- Node.js (v16 or higher)
- Harvest account with API access
- API Personal Access Token from Harvest
- Account ID from Harvest

## Usage
### Claude Desktop
- Open the Claude desktop config file `claude-desktop-config.json` and set the following details under `mcpServers`.

  ```jsonc
  {
    "mcpServers": {
      "Harvest": {
        "command": "npx",
        "args": [
          "@harvest/mcp-server-typescript",
          // Or use the path to the local build
          // "path/to/local/build/dist/index.js"
        ],
        "env": {
          "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
          "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>"
          "HARVEST_BASE_URL": "<Harvest Base URL>"
        }
      }
    }
  }
  ```

### Cursor IDE
- Open the Cursor IDE config file `~/.cursor/mcp.json` or `<project-root>/.cursor/mcp.json` and set the following details under `mcpServers`.

  ```jsonc
  {
    "mcpServers": {
      "Harvest": {
        "command": "npx",
        "args": [
          "@harvest/mcp-server-typescript",
          // Or use the path to the local build
          // "path/to/local/build/dist/index.js"
        ],
        "env": {
          "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
          "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>"
          "HARVEST_BASE_URL": "<Harvest Base URL>"
        }
      }
    }
  }
  ```


## Tools
1. `get-company` - Get company information
    - Inputs: None
    - Output: Returns Company Information(Name, URL, ID and Currency).
2. `search-clients` -  Searches for clients in Harvest account
    - Inputs:
      - name: string (optional) - The name of the client to search for.
      - isActive: boolean (optional) - Filter clients by their active status.
    - Output: Returns a list of clients with IDs and other details.
3. `get-client` - Get client information
    - Inputs:
      - clientId: string - The ID of the client to retrieve.
    - Output: Returns detailed information about the specified client.
4. `search-projects` - Searches for projects in Harvest account
    - Inputs:
      - name: string (optional) - The name of the project to search for.
      - clientId: string (optional) - The ID of the client to filter projects by.
      - isActive: boolean (optional) - Filter projects by their active status.
    - Output: Returns a list of projects with IDs and other details.
5. `get-project` - Get project information
    - Inputs:
      - projectId: string - The ID of the project to retrieve.
    - Output: Returns detailed information about the specified project.

_**Note: More tools coming soon.**_

## Local Installation And Development

1. Install dependencies:

   ```bash
   npm install
   ```
2. Build the project:

   ```bash
   npm run build
   ```
This will create a `dist` directory containing the compiled JavaScript files.

3. To use the local development version of MCP server instead of the published version, you can run the server directly from the local build:

   ```bash
   npm run build
   ```

   Modify the MCP server configuration file in any of the clients (Claude, Cursor)
   ```jsonc
    {
      "mcpServers": {
        "Harvest": {
          "command": "node",
          "args": [
            "path/to/local/build/dist/index.js"
          ],
          "env": {
            "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
            "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>"
            "HARVEST_BASE_URL": "<Harvest Base URL>"
          }
        }
      }
    } 
   ```
4. Restart the client application (Claude, Cursor) to apply the changes and test the latest changes without publishing a new version.
