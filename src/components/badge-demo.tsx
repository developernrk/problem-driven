import { Badge } from '@/components/ui/badge';

import { AlertCircleIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';

export function BadgeDemo() {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='flex w-full flex-col gap-2 md:flex-row'>
                <Badge>Badge</Badge>
                <Badge variant='secondary'>Secondary</Badge>
                <Badge variant='destructive'>Destructive</Badge>
                <Badge variant='outline'>Outline</Badge>
                <Badge variant='outline'>
                    <CheckIcon />
                    Badge
                </Badge>
                <Badge variant='destructive'>
                    <AlertCircleIcon />
                    Alert
                </Badge>
                <Badge className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'>8</Badge>
                <Badge className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums' variant='destructive'>
                    99
                </Badge>
                <Badge className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums' variant='outline'>
                    20+
                </Badge>
            </div>
            <div className='flex w-full flex-col gap-2 md:flex-row'>
                <Badge asChild>
                    <a href='#'>
                        Link <ArrowRightIcon />
                    </a>
                </Badge>
                <Badge asChild variant='secondary'>
                    <a href='#'>
                        Link <ArrowRightIcon />
                    </a>
                </Badge>
                <Badge asChild variant='destructive'>
                    <a href='#'>
                        Link <ArrowRightIcon />
                    </a>
                </Badge>
                <Badge asChild variant='outline'>
                    <a href='#'>
                        Link <ArrowRightIcon />
                    </a>
                </Badge>
            </div>
        </div>
    );
}
