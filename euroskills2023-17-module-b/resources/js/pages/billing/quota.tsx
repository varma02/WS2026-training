import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Quota, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

export default function BillingQuota({ quota }: { quota?: Quota }) {
	const { workspace } = usePage<SharedData>().props;
	const thisWorkspace = workspace?.all?.find((ws) => ws.id == workspace?.selected);

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Billing Quota',
			href: route('quota', { ws_id: thisWorkspace?.id }),
		},
	];

	const { data, setData, post, processing, errors, reset } = useForm<{
		limit?: number;
	}>({});

	useEffect(() => {
		setData({
			limit: quota?.limit,
		});
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('quota', { ws_id: thisWorkspace?.id }));
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title='Billing Quota' />
			<main className='flex h-full flex-1 flex-col p-6'>
				<h1 className='text-2xl font-bold'>Billing Quota</h1>
				<p className='text-muted-foreground mt-2'>Here you can set the billing quota for your workspace.</p>

				<div className='flex flex-wrap gap-6 py-6'>
					<div className='border-muted pr-6 sm:border-r'>
						<h3 className='text-sm leading-none'>Spending this month</h3>
						<p className='text-muted-foreground text-2xl leading-10'>$ 300</p>
					</div>
					<div className='border-muted pr-6 sm:border-r'>
						<h3 className='text-sm leading-none'>Spending average last 6 months</h3>
						<p className='text-muted-foreground text-2xl leading-10'>$ 128</p>
					</div>
					<form className='flex max-w-xl flex-col gap-4' onSubmit={submit}>
						<div className='flex gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='limit'>Limit</Label>
								<div className='focus-within:ring-accent border-muted flex items-center rounded-md border transition-all focus-within:ring-2'>
									<span className='grid h-full place-items-center border-r px-3'>$</span>
									<Input
										id='limit'
										type='number'
										autoFocus
										tabIndex={1}
										autoComplete='off'
										value={data.limit}
										onChange={(e) => setData('limit', parseInt(e.target.value))}
										placeholder='No limit'
										className='rounded-none border-none! ring-0! outline-none!'
									/>
								</div>
								<InputError message={errors.limit} />
							</div>
							<Button type='submit' className='self-end' tabIndex={4} disabled={processing}>
								{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
								Save
							</Button>
						</div>
					</form>
				</div>
			</main>
		</AppLayout>
	);
}
