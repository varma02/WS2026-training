import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ApiToken, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { format as formatDate } from 'date-fns';
import { Plus } from 'lucide-react';
import CreateApiToken from './create-api-token';
import EditApiToken from './edit-api-token';
import RevokeApiToken from './revoke-api-token';
import ShowApiToken from './show-api-token';

export default function Dashboard({
	tokens,
	dialog,
}: {
	tokens?: ApiToken[];
	dialog?:
		| { type: 'create' }
		| { type: 'edit'; id: number }
		| { type: 'show'; token: string }
		| { type: 'revoke'; id: number };
}) {
	const { workspace } = usePage<SharedData>().props;

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'API Tokens',
			href: route('api-tokens', { ws_id: workspace?.selected || 0 }),
		},
	];

	const revoked = tokens?.filter((token) => token.revoked_at) || [];
	const active = tokens?.filter((token) => !token.revoked_at) || [];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='API Tokens' />
			<main className='relative flex h-full flex-1 flex-col rounded-xl p-6'>
				<h1 className='text-2xl font-bold'>API Tokens</h1>
				<p className='text-muted-foreground mt-2'>
					{tokens?.length
						? 'Manage your API tokens here. Create, view, and delete tokens as needed.'
						: 'You have no API tokens yet. Create one to start using the API.'}
				</p>
				<Button
					variant='secondary'
					className='absolute top-4 right-4'
					onClick={() => router.visit(route('api-tokens.create', { ws_id: workspace?.selected }))}
				>
					<Plus />
					Create Token
				</Button>
				{tokens?.length ? (
					<>
						<h2 className='mt-6 mb-2 text-xl font-bold'>Active</h2>
						{active.length ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Created At</TableHead>
										<TableHead>Edited At</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{active.map((token) => (
										<TableRow key={token.id}>
											<TableCell>{token.name}</TableCell>
											<TableCell>{formatDate(token.created_at, 'Pp')}</TableCell>
											<TableCell>{formatDate(token.updated_at, 'Pp')}</TableCell>
											<TableCell className='space-x-4'>
												<Button
													variant='secondary'
													onClick={() =>
														router.visit(
															route('api-tokens.edit', { ws_id: workspace?.selected, tk_id: token.id }),
														)
													}
												>
													Change Name
												</Button>
												<Button
													variant='destructive'
													onClick={() =>
														router.visit(
															route('api-tokens.revoke', { ws_id: workspace?.selected, tk_id: token.id }),
														)
													}
												>
													Revoke
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p className='text-muted-foreground'>No active tokens found.</p>
						)}
						<h2 className='mt-4 mb-2 text-xl font-bold'>Revoked</h2>
						{revoked.length ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Created At</TableHead>
										<TableHead>Edited At</TableHead>
										<TableHead>Revoked At</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{revoked.map((token) => (
										<TableRow key={token.id}>
											<TableCell>{token.name}</TableCell>
											<TableCell>{formatDate(token.created_at, 'Pp')}</TableCell>
											<TableCell>{formatDate(token.updated_at, 'Pp')}</TableCell>
											<TableCell>{formatDate(token.revoked_at!, 'Pp')}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p className='text-muted-foreground'>No revoked tokens found.</p>
						)}
					</>
				) : (
					''
				)}
			</main>
			<CreateApiToken open={dialog?.type == 'create'} />
			<ShowApiToken open={dialog?.type == 'show'} token={dialog?.token} />
			<EditApiToken open={dialog?.type == 'edit'} token={tokens?.filter((v) => v.id == dialog?.id)[0]} />
			<RevokeApiToken open={dialog?.type == 'revoke'} token={tokens?.filter((v) => v.id == dialog?.id)[0]} />
		</AppLayout>
	);
}
