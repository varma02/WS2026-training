import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
	user: User;
}

export interface BreadcrumbItem {
	title: string;
	href: string;
}

export interface NavGroup {
	title: string;
	items: NavItem[];
}

export interface NavItem {
	title: string;
	href: string;
	icon?: LucideIcon | null;
	isActive?: boolean;
}

export interface SharedData {
	name: string;
	quote: { message: string; author: string };
	auth: Auth;
	workspace: {
		selected?: number;
		all: Workspace[];
	}
	ziggy: Config & { location: string };
	sidebarOpen: boolean;
	[key: string]: unknown;
}

export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}

export interface Workspace {
	id: number;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}

export interface ApiToken {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	revoked_at?: string;
	[key: string]: unknown;
}

export interface Quota {
	id: number;
	workspace_id: number;
	limit: number;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}

export interface Bill {
	id: number;
	workspace_id: number;
	total: number;
	paid: boolean;
	due: string;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}

export interface Usage {
	id: number;
	api_token_id: number;
	bill_id?: number;
	service: string;
	seconds: number;
	price_per_second: number;
	total: number;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}