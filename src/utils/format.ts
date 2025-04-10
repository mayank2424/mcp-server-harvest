import type { HarvestClient, HarvestProject } from "@/harvest-client/types/response";

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

export const formatProjectsList = (projects: HarvestProject[]) => {
    const formattedProjectsList = projects.map((project) => `
        **ID**: ${project.id}
        **Name**: ${project.name}
        **Is Active**: ${project.is_active}
        **Is Billable**: ${project.is_billable}
        **Hourly Rate**: ${project.hourly_rate || "N/A"}
    `);

    return formatListToLLMResponse(formattedProjectsList);
}
