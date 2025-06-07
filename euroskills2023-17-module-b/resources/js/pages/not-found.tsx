import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { FileQuestion } from 'lucide-react';

export default function NotFound({}) {
	return (
		<main className='flex h-screen items-center justify-center'>
			<Head title='Page Not Found' />
			<div className='flex flex-col items-center justify-center gap-4 text-center'>
				<FileQuestion className='size-12' />
				<h1 className='text-4xl font-bold'>404 - Not Found</h1>
				<p className='text-lg'>The page you are looking for does not exist.</p>
				<Button asChild variant='secondary'>
					<Link href={route('home')}>Go back to Home</Link>
				</Button>
			</div>
		</main>
	);
}
