'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, ReferenceLine, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { twMerge } from 'tailwind-merge';

export const description = 'A bar chart with a custom label';

const chartData = [
	{ month: 'January', cost: 186 },
	{ month: 'February', cost: 305 },
	{ month: 'March', cost: 237 },
	{ month: 'April', cost: 10 },
	{ month: 'May', cost: 209 },
	{ month: 'June', cost: 214 },
];

const chartConfig = {
	cost: {
		label: 'Cost',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

export function HorizontalBarChart({ className }: { className?: string }) {
	return (
		<Card className={twMerge('m-0 border-none p-0', className)}>
			{/* <CardHeader>
				<CardTitle>Bar Chart - Custom Label</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader> */}
			<CardContent className='p-0'>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='month'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey='cost' type='number' hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
						<ReferenceLine x={300} stroke='red' strokeWidth={2} />
						<Bar dataKey='cost' layout='vertical' fill='var(--color-cost)' radius={4}>
							<LabelList
								dataKey='month'
								position='insideLeft'
								offset={8}
								className='fill-(--color-foreground) font-bold'
								fontSize={12}
							/>
							<LabelList
								dataKey='cost'
								position='insideRight'
								offset={8}
								className='fill-foreground'
								fontSize={12}
								formatter={(value: number) => (value < 40 ? '' : `$ ${value.toLocaleString()}`)}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 p-0 text-sm'>
				<div className='flex gap-2 leading-none font-medium'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Shows the last 6 months of API costs with the red line showing the currently set quota.
				</div>
			</CardFooter>
		</Card>
	);
}
