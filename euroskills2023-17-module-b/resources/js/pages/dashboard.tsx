import { HorizontalBarChart } from '@/components/horizontal-bar-chart';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { Pencil, SquareArrowOutUpRight } from 'lucide-react';

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
				<div className='mt-4 flex flex-1 flex-wrap gap-4'>
					<HorizontalBarChart className='h-max flex-1' />
					<div className='h-max flex-1'>
						<h2 className='mb-2 text-xl font-bold'>Most recent bills</h2>
						{true ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Paid</TableHead>
										<TableHead>Created At</TableHead>
										<TableHead>Due</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{Array.from({ length: 5 }).map((_, i) => (
										<TableRow key={i}>
											<TableCell>Yes</TableCell>
											<TableCell>{formatDate('2025-06-01T00:00:00+01:00', 'Pp')}</TableCell>
											<TableCell>{formatDate('2025-06-15T23:59:59+01:00', 'Pp')}</TableCell>
											<TableCell className='space-x-4'>
												<Button
													variant='secondary'
													onClick={() => router.visit(route('dashboard', { ws_id: workspace?.selected }))}
												>
													<SquareArrowOutUpRight />
													<span className='sr-only'>Open</span>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p>You don't have any recent bills.</p>
						)}
					</div>
				</div>
			</main>
		</AppLayout>
	);
}
