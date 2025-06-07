import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Create Workspace',
		href: route('workspace.create'),
	},
];

export default function CreateWorkspace({}) {
	const { data, setData, post, processing, errors, reset } = useForm<
		Required<{
			name: string;
			description: string;
		}>
	>({
		name: '',
		description: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('workspace.create'));
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='Create Workspace' />
			<main className='flex h-full flex-1 flex-col p-6'>
				<h1 className='text-2xl font-bold'>Create Workspace</h1>
				<p className='text-muted-foreground mt-2'>
					Separate API usage, tokens, billing, quotas and bills by creating a new workspace.
				</p>

				<form className='flex max-w-xl flex-col gap-6 py-6' onSubmit={submit}>
					<div className='grid gap-6'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								type='text'
								required
								autoFocus
								tabIndex={1}
								autoComplete='off'
								value={data.name}
								onChange={(e) => setData('name', e.target.value)}
								placeholder='Demo Workspace'
							/>
							<InputError message={errors.name} />
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								tabIndex={2}
								autoComplete='off'
								value={data.description}
								placeholder='A brief description of your workspace'
								onChange={(e) => setData('description', e.target.value)}
							/>
							<InputError message={errors.description} />
						</div>

						<Button type='submit' className='mt-4 w-full' tabIndex={4} disabled={processing}>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Create
						</Button>
					</div>
				</form>
			</main>
		</AppLayout>
	);
}
