import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Component, KeyRound, LayoutGrid, Receipt, ShieldMinus, Users } from 'lucide-react';
import { Workspace, WorkspaceSwitcher } from './workspace-switcher';

export function AppSidebar() {
	const { workspace } = usePage<SharedData>().props;

	const mainNavItems: NavItem[] = [
		{
			title: 'Dashboard',
			href: route('dashboard', { ws_id: workspace?.selected || 0 }),
			icon: LayoutGrid,
		},
		{
			title: 'API Tokens',
			href: route('api-tokens', { ws_id: workspace?.selected || 0 }),
			icon: KeyRound,
		},
		{
			title: 'Bills',
			href: route('bills', { ws_id: workspace?.selected || 0 }),
			icon: Receipt,
		},
		{
			title: 'Billing Quota',
			href: route('quota', { ws_id: workspace?.selected || 0 }),
			icon: ShieldMinus,
		},
	];

	const footerNavItems: NavItem[] = [
		{
			title: 'My Workspaces',
			href: route('workspace.select'),
			icon: Component,
		},
	];

	let workspaces: Workspace[] = workspace?.all?.map((v) => ({ id: v.id, name: v.name, logo: Users }));
	if (!workspaces?.length) {
		workspaces = [{ id: 0, name: 'Select a workspace', logo: Users, disabled: true }];
	}

	return (
		<Sidebar collapsible='icon' variant='inset'>
			<SidebarHeader>
				<WorkspaceSwitcher
					workspaces={workspaces}
					selected={workspaces.findIndex((v) => v.id == workspace.selected)}
				/>
			</SidebarHeader>

			<SidebarContent className={workspace?.selected ? '' : 'cursor-default! opacity-75'}>
				<NavMain items={mainNavItems} title='Workspace' />
			</SidebarContent>

			<SidebarFooter>
				<NavFooter items={footerNavItems} className='mt-auto' />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
