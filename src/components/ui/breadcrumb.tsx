
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = React.ComponentProps<'nav'> & {
  items: BreadcrumbItem[];
  containerClassName?: string;
};

export function Breadcrumb({ items, className, containerClassName, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('bg-secondary', containerClassName)}>
        <ol className={cn('container mx-auto flex items-center gap-1.5 break-words px-4 py-3 text-sm text-muted-foreground sm:gap-2.5 md:px-6', className)} {...props}>
            <li className="inline-flex items-center gap-1.5">
                <Link href="/" className="flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                </Link>
            </li>
            {items.map((item, index) => (
                <li key={index} className="inline-flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-foreground/80 transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-foreground">{item.label}</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
  );
}

export function AutoBreadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const items: BreadcrumbItem[] = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        
        // Don't link the last item
        if(index === segments.length - 1) {
            return { label };
        }

        return { label, href };
    });

    if (items.length === 0) return null;

    // A simple heuristic to avoid showing breadcrumbs for admin pages where we might want more control
    if (segments[0] === 'admin') {
      return null;
    }

    return <Breadcrumb items={items} className={className} {...props} />;
}
