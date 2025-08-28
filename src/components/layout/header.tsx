
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
      <div className="container mx-auto px-4 md:px-6 pt-2 pb-1">
        <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
                <a href="#" className="text-white/80 hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="text-white/80 hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>
            </div>
        </div>
        <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Binarta Luhur" width={270} height={54} data-ai-hint="company logo" />
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
                        <Image src="/logo.png" alt="Binarta Luhur" width={270} height={54} data-ai-hint="company logo" />
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
                     <div className="flex items-center gap-3 mt-8">
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
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
