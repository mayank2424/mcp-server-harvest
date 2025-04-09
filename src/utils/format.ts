import type { HarvestClient } from "@/harvest-client/types";

export const formatListToLLMResponse = (list: string[]) => {
    return list.map((item) => `- ${item}`).join("\n");
}

export const formatClientsList = (clients: HarvestClient[]) => {
    const formattedClientsList = clients.map((client) => `
        **Name**: ${client.name}
        **ID**: ${client.id}
        **Is Active**: ${client.is_active}
        **Currency**: ${client.currency || "N/A"}
    `);

    return formatListToLLMResponse(formattedClientsList);
}
