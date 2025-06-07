'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { router } from '@inertiajs/react';

export interface Workspace {
	id: number;
	name: string;
	logo: React.ElementType;
	disabled?: boolean;
}

export function WorkspaceSwitcher({ workspaces, selected }: { workspaces: Workspace[]; selected?: number }) {
	const { isMobile } = useSidebar();
	const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces[selected || 0]);

	React.useEffect(() => {
		return setActiveWorkspace(workspaces[selected || 0]);
	}, [workspaces, selected]);

	function handleSwitchWorkspace(ws: Workspace) {
		if (ws.disabled) {
			return;
		}
		setActiveWorkspace(ws);
		router.visit(route('dashboard', { ws_id: ws.id || 0 }));
	}

	if (!activeWorkspace) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
								<activeWorkspace.logo className='size-4 text-black' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{activeWorkspace.name}</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						align='start'
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className='text-muted-foreground text-xs'>Workspaces</DropdownMenuLabel>
						{workspaces.map((ws, index) => (
							<DropdownMenuItem
								key={ws.name}
								disabled={ws.disabled}
								onClick={(e) => handleSwitchWorkspace(ws)}
								className='gap-2 p-2'
							>
								<div className='flex size-6 items-center justify-center rounded-md border'>
									<ws.logo className='size-3.5 shrink-0' />
								</div>
								{ws.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2' onClick={() => router.visit(route('workspace.create'))}>
							<div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
								<Plus className='size-4' />
							</div>
							<div className='text-muted-foreground font-medium'>New workspace</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
