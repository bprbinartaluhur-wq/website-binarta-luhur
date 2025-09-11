
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const topNavItems = [
    { name: 'Tentang Binarta Luhur', href: '/tentang-kami' },
    { name: 'Suku Bunga', href: '#' },
    { name: 'Karir', href: '#' },
    { name: 'Partner Kami', href: '#' },
    { name: 'Lokasi Kantor', href: '/#kontak' },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tabungan', href: '/produk/tabungan' },
  { name: 'Deposito', href: '/produk/deposito' },
  { name: 'Kredit', href: '/produk/pinjaman' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className={cn(
          "bg-white text-muted-foreground transition-transform duration-300 ease-in-out h-10",
          !isVisible && '-translate-y-full'
      )}>
           <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-center">
                <div className="hidden md:flex items-center justify-center gap-x-3 text-sm whitespace-nowrap">
                    {topNavItems.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-x-3">
                            <Link href={item.href} className="text-muted-foreground/80 hover:text-primary transition-colors font-bold">
                                {item.name}
                            </Link>
                            {index < topNavItems.length - 1 && <Separator orientation="vertical" className="h-4" />}
                        </div>
                    ))}
                </div>
            </div>
      </div>
      
      {/* Bottom Bar - Main Navigation */}
      <div className={cn(
          "bg-primary transition-all duration-300",
          "transform",
           !isVisible ? '-translate-y-10' : 'translate-y-0'
          )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center h-16">
             <div className="flex-1">
                 <Link href="/" className="hidden md:block">
                     <Image src="/logo.png" alt="Binarta Luhur" width={180} height={45} data-ai-hint="company logo" />
                </Link>
             </div>
             <nav className="hidden md:flex items-center justify-center gap-8 h-full">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-md font-bold text-primary-foreground px-3 py-2 h-full flex items-center transition-colors hover:bg-black/10"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="flex-1 flex justify-end">
                {/* Placeholder for right side content if needed */}
            </div>

            <div className="md:hidden flex-grow flex justify-end">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 hover:text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Buka menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-0">
                  <div className="p-6">
                      <Link href="/" className="flex items-center gap-2 mb-8" onClick={closeMobileMenu}>
                          <Image src="/logo.png" alt="Binarta Luhur" width={180} height={45} data-ai-hint="company logo" />
                      </Link>
                      <nav className="flex flex-col gap-2 mb-6">
                      {navItems.map((item) => (
                          <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block text-xl font-medium text-foreground transition-colors hover:text-primary py-3"
                          >
                          {item.name}
                          </Link>
                      ))}
                      </nav>
                       <Separator />
                      <div className="flex flex-col gap-2 mt-6">
                        {topNavItems.map((item) => (
                          <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block text-md font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                          >
                          {item.name}
                          </Link>
                        ))}
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
