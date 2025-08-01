import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { InfoIcon } from 'lucide-react';

export function TooltipDemo() {
    return (
        <div className='flex flex-col gap-6 md:flex-row'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='outline'>Hover</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
            <div className='flex gap-2'>
                {['top', 'right', 'bottom', 'left'].map((side) => (
                    <Tooltip key={side}>
                        <TooltipTrigger asChild>
                            <Button variant='outline' className='capitalize'>
                                {side}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side={side as 'top' | 'right' | 'bottom' | 'left'}>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <InfoIcon />
                        <span className='sr-only'>Info</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    To learn more about how this works, check out the docs. If you have any questions, please reach out
                    to us.
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
