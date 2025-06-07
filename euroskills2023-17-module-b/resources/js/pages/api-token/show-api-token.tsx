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
import { router, usePage } from '@inertiajs/react';

export default function ShowApiToken({ open, token }: { open?: boolean; token?: string }) {
	const { workspace } = usePage<SharedData>().props;
	return (
		<Dialog
			open={!!open}
			onOpenChange={() => router.visit(route('api-tokens', { ws_id: workspace?.selected }))}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>New API Token</DialogTitle>
					<DialogDescription>
						Your API Token was created successfuly. Make sure to save it somewhere because you cannot view it
						again.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4'>
					<div className='grid gap-3'>
						<Label htmlFor='token'>Token</Label>
						<Input id='token' name='token' readOnly autoFocus defaultValue={token} />
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='secondary'>Close</Button>
					</DialogClose>
					<Button onClick={() => window.navigator.clipboard.writeText(token!)}>Copy</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
