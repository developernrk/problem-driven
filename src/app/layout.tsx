import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { BackToTopButton } from '@/components/ui/scroll-components';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'ProblemDriven - AI-Powered Problem-Solution Marketplace',
    description: 'Transform problems into opportunities. Discover innovative business solutions for social, community, and entrepreneurship challenges with AI-powered insights and strategic analysis.',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#09090b' }
    ]
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <ClerkProvider>
            <html suppressHydrationWarning lang='en'>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                    <ThemeProvider attribute='class'>
                        {children}
                        <Toaster />
                        {/* Back to Top Button */}
                        <BackToTopButton
                            showAfter={300}
                            size="md"
                            variant="default"
                            position="bottom-right"
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                        />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
