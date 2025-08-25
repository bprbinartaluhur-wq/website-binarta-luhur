'use client';

import Link from 'next/link';
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
import { Building2, Home, Package, Award, Newspaper, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', icon: Home, label: 'Dasbor' },
        { href: '/admin/dashboard/products', icon: Package, label: 'Produk' },
        { href: '/admin/dashboard/awards', icon: Award, label: 'Penghargaan' },
        { href: '/admin/dashboard/news', icon: Newspaper, label: 'Berita' },
    ];

    return (
        <>
            <SidebarHeader>
                 <div className="flex items-center gap-2">
                    <Building2 className="h-7 w-7 text-primary" />
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
                             <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuButton 
                                    isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <Link href="/" passHref legacyBehavior>
                    <SidebarMenuButton tooltip="Kembali ke Website">
                        <LogOut />
                        <span>Kembali ke Website</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarFooter>
        </>
    );
}
