import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { format as formatDate } from 'date-fns';

export default function Bills() {
	const { workspace } = usePage<SharedData>().props;

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Bills',
			href: route('bills', { ws_id: workspace?.selected || 0 }),
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='My Workspaces' />
			<main className='relative flex h-full flex-1 flex-col rounded-xl p-6'>
				<h1 className='text-2xl font-bold'>Your bills</h1>
				<p className='text-muted-foreground mt-2 mb-4'>
					Here you can view your recent bills. If you have any unpaid bills, they will be lifted to the top.
				</p>
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
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<p>You don't have any recent bills.</p>
				)}
			</main>
		</AppLayout>
	);
}
