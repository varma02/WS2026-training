import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Bill, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { format as formatDate } from 'date-fns';

export default function Bills({ bills }: { bills?: Bill[] }) {
	const { workspace } = usePage<SharedData>().props;

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Bills',
			href: route('bills', { ws_id: workspace?.selected || 0 }),
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='Bills' />
			<main className='relative flex h-full flex-1 flex-col rounded-xl p-6'>
				<h1 className='text-2xl font-bold'>Your bills</h1>
				<p className='text-muted-foreground mt-2 mb-4'>
					Here you can view your recent bills. If you have any unpaid bills, they will be lifted to the top.
				</p>
				{bills?.length ? (
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
							{bills.map((v) => (
								<TableRow key={v.id}>
									<TableCell>{v.paid ? 'Yes' : 'No'}</TableCell>
									<TableCell>{formatDate(v.created_at, 'Pp')}</TableCell>
									<TableCell>{formatDate(v.due, 'Pp')}</TableCell>
									<TableCell className='space-x-4'>
										<Button
											variant='secondary'
											onClick={() =>
												router.visit(route('view-bill', { ws_id: workspace?.selected, bl_id: v.id }))
											}
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
