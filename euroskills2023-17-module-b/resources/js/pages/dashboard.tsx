import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
	},
];

export default function Dashboard() {
	const { workspace } = usePage<SharedData>().props;

	const thisWorkspace = workspace?.all?.find((ws) => ws.id == workspace?.selected);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='Dashboard' />
			<main className='relative flex flex-1 flex-col p-6'>
				<h1 className='text-2xl font-bold'>{thisWorkspace?.name}</h1>
				<p className='text-muted-foreground'>{thisWorkspace?.description}</p>
				<Button
					variant='secondary'
					className='absolute top-4 right-4'
					onClick={() => router.visit(route('workspace.edit', { ws_id: thisWorkspace?.id }))}
				>
					<Pencil />
					Edit
				</Button>
			</main>
		</AppLayout>
	);
}
