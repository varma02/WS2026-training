import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'My Workspaces',
		href: route('workspace.select'),
	},
];

export default function SelectWorkspace() {
	const { workspace } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='My Workspaces' />
			<main className='flex h-full flex-1 flex-col rounded-xl p-6'>
				<h1 className='text-2xl font-bold'>Select a Workspace</h1>
				<p className='text-muted-foreground mt-2'>
					{workspace?.all?.length
						? 'Please select a workspace or create a new one to continue.'
						: 'It appears that you have no workspaces yet. Create a new workspace to get started.'}
				</p>
				<ul className='flex flex-wrap gap-6 py-6'>
					{workspace?.all?.map((ws) => (
						<li
							key={ws.id}
							role='button'
							className='cursor-pointer select-none'
							onClick={() => router.visit(route('dashboard', { ws_id: ws.id || 0 }))}
						>
							<Card>
								<CardHeader className='flex flex-col justify-center'>
									<CardTitle className='flex items-center gap-4'>
										<div className='aspect-square h-8 w-8 rounded-xl bg-white p-1 text-black'>
											<Users />
										</div>
										{ws.name}
									</CardTitle>
									<CardDescription className='mt-2'>{ws.description}</CardDescription>
								</CardHeader>
							</Card>
						</li>
					))}
					<li
						role='button'
						className='cursor-pointer select-none'
						onClick={() => router.visit(route('workspace.create'))}
					>
						<Card>
							<CardHeader className='flex flex-col justify-center'>
								<CardTitle className='flex items-center gap-4'>
									<div className='aspect-square h-8 w-8 rounded-xl bg-white p-1 text-black'>
										<Plus />
									</div>
									New Workspace
								</CardTitle>
								<CardDescription className='mt-2'>Create a new workspace</CardDescription>
							</CardHeader>
						</Card>
					</li>
				</ul>
			</main>
		</AppLayout>
	);
}
