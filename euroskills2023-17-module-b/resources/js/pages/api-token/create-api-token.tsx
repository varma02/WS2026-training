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
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateApiToken({ open }: { open?: boolean }) {
	const { workspace } = usePage<SharedData>().props;

	const { data, setData, post, processing, errors, reset } = useForm<Required<{ name: string }>>({
		name: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('api-tokens.create', { ws_id: workspace?.selected }));
	};
	return (
		<Dialog
			open={!!open}
			onOpenChange={() => router.visit(route('api-tokens', { ws_id: workspace?.selected }))}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<form className='contents' onSubmit={submit}>
					<DialogHeader>
						<DialogTitle>New API Token</DialogTitle>
						<DialogDescription>Create an API token to authenticate your requests.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Label htmlFor='name'>Name</Label>
							<Input
								value={data.name}
								onChange={(e) => setData('name', e.target.value)}
								id='name'
								name='name'
								placeholder='My API Token'
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button type='submit'>Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
