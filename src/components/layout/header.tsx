'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Publikasi', href: '/publikasi' },
  { 
    name: 'Produk', 
    href: '#',
    submenu: [
        { name: 'Tabungan', href: '/produk/tabungan' },
        { name: 'Deposito', href: '/produk/deposito' },
        { name: 'Pinjaman', href: '/produk/pinjaman' },
    ]
  },
  { name: 'Penghargaan', href: '/#penghargaan' },
  { name: 'Kontak', href: '/#kontak' },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.93-2.33-4.51-1.92-6.91.4-2.36 1.87-4.32 3.73-5.46 1.84-1.15 4.09-1.5 6.13-1.02.03 2.06-.01 4.12.01 6.18-.08 1.05-.62 2.05-1.43 2.72-1.31 1.1-3.14 1.48-4.75 1.09-1.09-.27-1.99-1.02-2.58-1.95-.58-.92-.82-2.07-.62-3.21.2-1.13.82-2.12 1.63-2.82.81-.7 1.84-1.07 2.92-1.02.12 2.19.01 4.38-.01 6.57.01-2.2.01-4.4-.01-6.6.01-.02.01-.02.01-.04z"/>
    </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-accent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="hidden md:flex justify-end items-center h-6">
            <div className="flex items-center gap-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="text-white/80 hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="text-white/80 hover:text-white transition-colors"><TikTokIcon className="h-4 w-4" /></a>
            </div>
        </div>
        <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Binarta Luhur" width={240} height={60} data-ai-hint="company logo" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
                item.submenu ? (
                <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn("text-md font-medium text-white/90 transition-colors hover:text-white hover:bg-transparent p-0")}>
                        {item.name}
                        <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                    {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href}>{subItem.name}</Link>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                ) : (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn("text-md font-medium text-white/90 transition-colors hover:text-white")}
                >
                    {item.name}
                </Link>
                )
            ))}
            </nav>

            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("text-white hover:bg-white/10 hover:text-white")}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Buka menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={closeMobileMenu}>
                        <Image src="/logo.png" alt="Binarta Luhur" width={240} height={60} data-ai-hint="company logo" />
                    </Link>
                    <nav className="flex flex-col gap-2">
                    <Accordion type="single" collapsible className="w-full">
                        {navItems.map((item) => (
                        item.submenu ? (
                            <AccordionItem value={item.name} key={item.name} className="border-b-0">
                            <AccordionTrigger className="text-xl font-medium text-foreground transition-colors hover:text-primary hover:no-underline py-3">
                                {item.name}
                            </AccordionTrigger>
                            <AccordionContent className="pb-2">
                                <div className="flex flex-col gap-2 pl-4 border-l ml-2">
                                {item.submenu.map((subItem) => (
                                    <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={closeMobileMenu}
                                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                                    >
                                    {subItem.name}
                                    </Link>
                                ))}
                                </div>
                            </AccordionContent>
                            </AccordionItem>
                        ) : (
                            <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="block text-xl font-medium text-foreground transition-colors hover:text-primary py-3"
                            >
                            {item.name}
                            </Link>
                        )
                        ))}
                    </Accordion>
                    </nav>
                     <div className="flex items-center gap-4 mt-8">
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><TikTokIcon className="h-6 w-6" /></a>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
