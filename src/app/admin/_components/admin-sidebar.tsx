'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, Package, Award, Newspaper, LogOut, GalleryHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', icon: Home, label: 'Dasbor' },
        { href: '/admin/dashboard/carousel', icon: GalleryHorizontal, label: 'Carousel' },
        { href: '/admin/dashboard/products', icon: Package, label: 'Produk' },
        { href: '/admin/dashboard/awards', icon: Award, label: 'Penghargaan' },
        { href: '/admin/dashboard/news', icon: Newspaper, label: 'Berita' },
    ];

    return (
        <>
            <SidebarHeader>
                 <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Admin Logo" width={32} height={32} className="rounded-lg" data-ai-hint="company logo" />
                    <span className="text-xl font-bold font-headline text-foreground">
                        Admin
                    </span>
                    <div className="flex-grow" />
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton 
                                asChild
                                isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
                                tooltip={item.label}
                            >
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton asChild tooltip="Kembali ke Website">
                    <Link href="/">
                        <LogOut />
                        <span>Kembali ke Website</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarFooter>
        </>
    );
}
