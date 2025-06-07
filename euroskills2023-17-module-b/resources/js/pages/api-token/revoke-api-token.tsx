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
import { ApiToken, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function RevokeApiToken({ open, token }: { open?: boolean; token?: ApiToken }) {
	const { workspace } = usePage<SharedData>().props;

	const { post, processing, errors } = useForm();

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('api-tokens.revoke', { ws_id: workspace?.selected, tk_id: token?.id }));
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
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button type='submit' variant='destructive' disabled={processing}>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Revoke
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
