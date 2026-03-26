[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/mayank2424-mcp-server-harvest-badge.png)](https://mseep.ai/app/mayank2424-mcp-server-harvest)

# Harvest Time Tracking MCP Server

[![npm version](https://img.shields.io/npm/v/@mayankg0324/mcp-server-harvest.svg)](https://www.npmjs.com/package/@mayankg0324/mcp-server-harvest)

A TypeScript based MCP (Model Context Protocol) server for Harvest time tracking app enabling LLM clients to interact with Harvest account.

## Installation

```bash
npx -y @mayankg0324/mcp-server-harvest
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18 (or [Bun Runtime](https://bun.sh/) for development)
- Harvest account with API access
- API Personal Access Token from Harvest
- Account ID from Harvest

_More details on how to create a Personal Access Token can be found in the [Harvest API documentation](https://help.getharvest.com/api-v2/authentication-api/authentication/authentication/#personal-access-tokens)._

## Available Tools

| Tool | Description | Inputs | Output |
|------|-------------|---------|---------|
| `get-company` | Get company information | None | Company Information (Name, URL, ID and Currency) |
| `search-clients` | Searches for clients | • name: string (optional) - Client name<br>• isActive: boolean (optional) - Active status | List of clients with IDs and details |
| `get-client` | Get client information | • clientId: string - Client ID | Detailed client information |
| `search-projects` | Searches for projects | • name: string (optional) - Project name<br>• clientId: string (optional) - Client ID<br>• isActive: boolean (optional) - Active status | List of projects with IDs and details |
| `get-project` | Get project information | • projectId: string - Project ID | Detailed project information |
| `list-users` | Lists all users | None | List of users with IDs and details |
| `get-user` | Get user information | • userId: string - User ID | Detailed user information |
| `list-project-users` | List project user assignments | • projectId: string - Project ID | List of users assigned to project |
| `list-project-tasks` | List project task assignments | • projectId: string - Project ID | List of tasks assigned to project |
| `search-time-entries` | Searches for time entries | • from: string (optional) - Start date (YYYY-MM-DD)<br>• to: string (optional) - End date (YYYY-MM-DD)<br>• userId: string (optional) - User ID<br>• projectId: string (optional) - Project ID<br>• clientId: string (optional) - Client ID | List of time entries with details |
| `get-time-entry` | Get time entry details | • timeEntryId: string - Time Entry ID | Detailed time entry information |
| `create-time-entry` | Create a new time entry | • projectId: string - Project ID<br>• taskId: string - Task ID<br>• userId: string - User ID<br>• hours: number - Hours spent<br>• notes: string (optional) - Additional notes | Created time entry details |

_**Note:** More tools coming soon._

## Usage

### Claude Desktop

Open the Claude desktop config file `claude-desktop-config.json` and add the following under `mcpServers`:

```jsonc
{
  "mcpServers": {
    "Harvest": {
      "command": "npx",
      "args": [
        "-y",
        "@mayankg0324/mcp-server-harvest"
      ],
      "env": {
        "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
        "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>",
        "HARVEST_BASE_URL": "<Harvest Base URL>"
      }
    }
  }
}
```

### Cursor IDE

Open the Cursor IDE config file `~/.cursor/mcp.json` or `<project-root>/.cursor/mcp.json` and add the following under `mcpServers`:

```jsonc
{
  "mcpServers": {
    "Harvest": {
      "command": "npx",
      "args": [
        "-y",
        "@mayankg0324/mcp-server-harvest"
      ],
      "env": {
        "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
        "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>",
        "HARVEST_BASE_URL": "<Harvest Base URL>"
      }
    }
  }
}
```

### Troubleshooting

#### `spawn npx ENOENT` or `env: node: No such file or directory`

This happens when your MCP client (Claude Desktop, Cursor) cannot find `npx` or `node` in its PATH. GUI applications often don't inherit your shell's PATH, especially if you use a version manager like **nvm**, **fnm**, or **volta**.

**Fix:** Use the full path to `npx` and include your Node bin directory in the `PATH` env variable:

```bash
# Find your npx and node paths
which npx
# e.g. /Users/you/.nvm/versions/node/v22.20.0/bin/npx
```

Then update your MCP config:

```jsonc
{
  "mcpServers": {
    "Harvest": {
      "command": "/Users/you/.nvm/versions/node/v22.20.0/bin/npx",
      "args": [
        "-y",
        "@mayankg0324/mcp-server-harvest"
      ],
      "env": {
        "PATH": "/Users/you/.nvm/versions/node/v22.20.0/bin:/usr/bin:/bin",
        "HARVEST_ACCOUNT_ID": "<Harvest Account ID>",
        "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>",
        "HARVEST_BASE_URL": "<Harvest Base URL>"
      }
    }
  }
}
```

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

   This will create a `dist` directory containing the compiled JavaScript files.

3. To use the local development version, modify your MCP server config to point to the local build:

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
           "HARVEST_ACCESS_TOKEN": "<Harvest Personal Access Token>",
           "HARVEST_BASE_URL": "<Harvest Base URL>"
         }
       }
     }
   }
   ```

4. Restart the client application (Claude, Cursor) to apply the changes.

## License

MIT
