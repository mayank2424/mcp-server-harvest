import type { HarvestClient, HarvestProject, HarvestTaskAssignment, HarvestTimeEntry, HarvestUser, HarvestUserAssignment } from "@/harvest-client/types/response";

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

export const formatUsersList = (users: HarvestUser[]) => {

    const formattedUsersList = users.map((user) => `
        **ID**: ${user.id}
        **Name**: ${user.first_name} ${user.last_name}
        **Email**: ${user.email}
        **Is Active**: ${user.is_active}
        **Is Contractor**: ${user.is_contractor}
    `);

    return formatListToLLMResponse(formattedUsersList);
}

export const formatProjectUserAssignmentsList = (userAssignments: HarvestUserAssignment[]) => {
    const formattedUsersList = userAssignments.map((userAssignment) => `
        **ID**: ${userAssignment.id}
        **User Name**: ${userAssignment?.user?.name}
        **Is Active**: ${userAssignment.is_active}
        **Project Name**: ${userAssignment?.project?.name || "N/A"}
    `);

    return formatListToLLMResponse(formattedUsersList);
}

export const formatProjectTaskAssignmentsList = (taskAssignments: HarvestTaskAssignment[]) => {
    const formattedTasksList = taskAssignments.map((taskAssignment) => `
        **ID**: ${taskAssignment.id}
        **Task Name**: ${taskAssignment?.task?.name || "N/A"}
        **Is Active**: ${taskAssignment.is_active}
        **Project Name**: ${taskAssignment?.project?.name || "N/A"}
    `);

    return formatListToLLMResponse(formattedTasksList);
}


export const formatTimeEntryList = (timeEntries: HarvestTimeEntry[]) => {
    const formattedTimeEntriesList = timeEntries.map((timeEntry) => `
        **ID**: ${timeEntry.id}
        **Project Name**: ${timeEntry?.project?.name || "N/A"}
        **Task Name**: ${timeEntry?.task?.name || "N/A"}
        **User Name**: ${timeEntry?.user?.name || "N/A"}
        **Client Name**: ${timeEntry?.client?.name || "N/A"}
        **Date**: ${timeEntry.spent_date}
        **Hours**: ${timeEntry.hours}
        **Rounded Hours**: ${timeEntry.rounded_hours}
        **Notes**: ${timeEntry.notes || "N/A"}
    `);

    return formatListToLLMResponse(formattedTimeEntriesList);
}
