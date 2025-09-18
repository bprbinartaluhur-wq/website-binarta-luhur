
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const menuItems = [
  {
    title: 'Sejarah',
    href: '/tentang-kami/sejarah',
    image: 'https://picsum.photos/seed/history/600/400',
    dataAiHint: 'old building history',
  },
  {
    title: 'Laporan Keuangan Publikasi',
    href: '/publikasi',
    image: 'https://picsum.photos/seed/finance-report/600/400',
    dataAiHint: 'financial chart document',
  },
  {
    title: 'Annual Report',
    href: '/publikasi',
    image: 'https://picsum.photos/seed/annual-report/600/400',
    dataAiHint: 'corporate meeting presentation',
  },
  {
    title: 'Berita Binarta',
    href: '#',
    image: 'https://picsum.photos/seed/news/600/400',
    dataAiHint: 'newspaper article news',
  },
  {
    title: 'Profil Binarta',
    href: '#',
    image: 'https://picsum.photos/seed/profile/600/400',
    dataAiHint: 'company building office',
  },
  {
    title: 'Budaya Kerja',
    href: '/tentang-kami/budaya-kerja',
    image: 'https://picsum.photos/seed/culture/600/400',
    dataAiHint: 'team collaboration office',
  },
  {
    title: 'Visi dan Misi',
    href: '/tentang-kami/visi-misi',
    image: 'https://picsum.photos/seed/vision/600/400',
    dataAiHint: 'mountain peak success',
  },
   {
    title: 'Hubungi Kami',
    href: '/#kontak',
    image: 'https://picsum.photos/seed/contact/600/400',
    dataAiHint: 'contact us phone',
  },
];

export default function TentangKamiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.title} className="group">
                        <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                            <div className="aspect-video relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={item.dataAiHint}
                                />
                            </div>
                            <div className="p-5 flex items-center justify-between">
                                <h3 className="font-headline text-lg font-bold text-foreground">{item.title}</h3>
                                <ArrowRight className="h-5 w-5 text-primary transform transition-transform group-hover:translate-x-1" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
