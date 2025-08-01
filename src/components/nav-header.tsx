'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from '@/components/ui/navigation-menu';

export function NavHeader() {
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList className='gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium'>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/'}>
                        <Link href='/'>Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/charts'}>
                        <Link href='/charts'>Charts</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/forms'}>
                        <Link href='/forms'>Forms</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/login'}>
                        <Link href='/login'>Login</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
