'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';

import { addDays } from 'date-fns';
import { type DateRange } from 'react-day-picker';

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 12),
        to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
    });
    const [range, setRange] = React.useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 12),
        to: addDays(new Date(new Date().getFullYear(), 0, 12), 50)
    });

    return (
        <div className='flex flex-col flex-wrap items-start gap-2 md:flex-row'>
            <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border shadow-sm' />
            <Calendar
                mode='range'
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                className='rounded-md border shadow-sm'
            />
            <Calendar
                mode='range'
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                numberOfMonths={3}
                className='rounded-md border shadow-sm [&>div]:gap-5'
            />
        </div>
    );
}
