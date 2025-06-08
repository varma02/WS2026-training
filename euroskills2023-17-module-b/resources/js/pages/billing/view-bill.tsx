import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { roundTo } from '@/lib/utils';
import { Bill, SharedData, Usage, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function ViewBill({ bill, usages }: { bill?: Bill; usages?: Usage[] }) {
	const { workspace } = usePage<SharedData>().props;

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Bills',
			href: route('bills', { ws_id: workspace?.selected || 0 }),
		},
		{
			title: 'Bill Details',
			href: route('view-bill', { ws_id: workspace?.selected || 0, bl_id: bill?.id || 0 }),
		},
	];

	const apiTokens = usages
		?.reduce<number[]>((acc, v) => (acc.includes(v.api_token_id) ? acc : [...acc, v.api_token_id]), [])
		.map((v) => ({
			...(usages.find((s) => s.api_token_id == v)?.api_token as any),
			services: usages
				.filter((s) => s.api_token_id == v)
				.reduce<any>(
					(acc, s) => ({
						...acc,
						[s.service]: {
							...s,
							seconds: roundTo(s.seconds + (acc[s.service]?.seconds || 0), 3),
							total: roundTo(s.total + (acc[s.service]?.total || 0), 2),
						},
					}),
					{},
				),
		}));

	console.log(apiTokens);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='Bills' />
			<main className='relative flex h-full flex-1 flex-col rounded-xl p-6'>
				<h1 className='text-2xl font-bold'>Bill Details</h1>
				<p className='text-muted-foreground mt-2 mb-4'>
					This show the tokens and cost brakedown of the bill.
				</p>
				{apiTokens?.map((v: any) => (
					<div key={v} className='mb-6'>
						<h2 className='mt-6 mb-2 text-xl font-bold'>{v?.name || '?'} token</h2>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Service</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Per second</TableHead>
									<TableHead>Total</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.entries(v.services).map(([k, v]: any) => (
									<TableRow key={v.id}>
										<TableCell>{k}</TableCell>
										<TableCell>{v.seconds / 1000} s</TableCell>
										<TableCell>$ {v.price_per_second}</TableCell>
										<TableCell>$ {v.total}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				))}
			</main>
		</AppLayout>
	);
}
