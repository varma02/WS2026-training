import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function roundTo(value: number, precision: number): number {
	const factor = Math.pow(10, precision);
	return Math.round(value * factor) / factor;
}