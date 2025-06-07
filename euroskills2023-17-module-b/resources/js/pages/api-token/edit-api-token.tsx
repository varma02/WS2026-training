import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiToken, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

export default function EditApiToken({ open, token }: { open?: boolean; token?: ApiToken }) {
	const { workspace } = usePage<SharedData>().props;

	const { data, setData, post, processing, errors, reset } = useForm<Required<{ name: string }>>({
		name: '',
	});

	useEffect(() => {
		setData('name', token?.name || '');
	}, [token]);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('api-tokens.edit', { ws_id: workspace?.selected, tk_id: token?.id }));
	};
	return (
		<Dialog
			open={!!open}
			onOpenChange={() => router.visit(route('api-tokens', { ws_id: workspace?.selected }))}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<form className='contents' onSubmit={submit}>
					<DialogHeader>
						<DialogTitle>Edit API Token</DialogTitle>
						<DialogDescription>Change the name of your API Token</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Label htmlFor='name-1'>Name</Label>
							<Input
								id='name-1'
								name='name'
								value={data.name}
								onChange={(e) => setData('name', e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button type='submit' disabled={processing}>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
