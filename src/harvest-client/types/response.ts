// Common
export interface PaginatedResponse {
    per_page: number;
    total_pages: number;
    total_entries: number;
    next_page: number | null;
    previous_page: number | null;
    page: number;
    links: {
        first: string;
        next: string | null;
        previous: string | null;
        last: string;
    };
}

export interface HarvestCompany {
    base_uri: string;
    full_domain: string;
    name: string;
    is_active: boolean;
    week_start_day: string;
    wants_timestamp_timers: boolean;
    time_format: string;
    date_format: string;
    plan_type: string;
    expense_feature: boolean;
    invoice_feature: boolean;
    estimate_feature: boolean;
    team_feature: boolean;
    weekly_capacity: number;
    approval_feature: boolean;
    clock: string;
    currency: string;
    currency_code_display: string;
    currency_symbol_display: string;
    decimal_symbol: string;
    thousands_separator: string;
    color_scheme: string;
    saml_sign_in_required: boolean;
    day_entry_notes_required: boolean;
}

// Harvest Projects
export interface HarvestClient {
    id: number;
    name: string;
    is_active: boolean;
    address: string;
    currency: string
}

export interface HarvestProject {
    id: number;
    name: string;
    code: string | null;
    is_active: boolean;
    is_billable: boolean;
    is_fixed_fee: boolean;
    bill_by: string;
    budget: number;
    budget_by: string;
    budget_is_monthly: boolean;
    notify_when_over_budget: boolean;
    over_budget_notification_percentage: number;
    show_budget_to_all: boolean;
    created_at: string;
    updated_at: string;
    starts_on: string;
    ends_on: string | null;
    over_budget_notification_date: string | null;
    notes: string;
    cost_budget: number;
    cost_budget_include_expenses: boolean;
    hourly_rate: number;
    fee: number | null;
    client: HarvestClient;
}

export interface HarvestProjects extends PaginatedResponse {
    projects: HarvestProject[];
}

// Harvest Task
export interface HarvestTask {
    id: number;
    name: string;
    billable_by_default: boolean;
    is_default: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    default_hourly_rate: number | null;
}

export interface HarvestTaskList extends PaginatedResponse {
    tasks: HarvestTask[];
}

// Task Assignment
export interface HarvestTaskAssignment {
    id: number;
    billable: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    hourly_rate: number | null;
    budget: number | null;
    project: HarvestProject;
    task: HarvestTask;
}

export interface HarvestTaskAssignmentList
    extends PaginatedResponse {
    task_assignments: HarvestTaskAssignment[];
}

// User
export interface HarvestUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    timezone: string;
    weekly_capacity: number;
    has_access_to_all_future_projects: boolean;
    is_contractor: boolean;
    is_active: boolean;
    calendar_integration_enabled: boolean;
    calendar_integration_source: string | null;
    created_at: string;
    updated_at: string;
    can_create_projects: boolean;
    default_hourly_rate: number | null;
    cost_rate: number;
    roles: string[];
    access_roles: string[];
    permissions_claims: string[];
    avatar_url: string;
}

export interface HarvestUsers extends PaginatedResponse { 
    users: HarvestUser[];
}

export interface HarvestUserAssignment {
    id: number;
    is_project_manager: boolean;
    is_active: boolean;
    use_default_rates: boolean;
    created_at: string;
    updated_at: string;
    hourly_rate: number | null;
    budget: number | null;
    project: HarvestProject;
    user: HarvestUser;
}

// Time Entries
export interface HarvestTimeEntry {
    id: number;
    spent_date: Date;
    hours: number;
    hours_without_timer: number;
    rounded_hours: number;
    notes: string;
    is_locked: boolean;
    locked_reason: string | null;
    is_closed: boolean;
    is_billed: boolean;
    timer_started_at: string | null;
    started_time: string | null;
    ended_time: string | null;
    is_running: boolean;
    billable: boolean;
    budgeted: boolean;
    billable_rate: number;
    cost_rate: number;
    created_at: string;
    updated_at: string;
    user: HarvestUser;
    client: HarvestClient;
    project: HarvestProject;
    task: HarvestTask;
    user_assignment: HarvestUserAssignment;
    task_assignment: HarvestTaskAssignment;
    invoice: string | null;
    external_reference: string | null;
}

export interface HarvestTimEntries
    extends PaginatedResponse { 
    time_entries: HarvestTimeEntry[];
    }
