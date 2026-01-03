
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Separator } from '../ui/separator';

const newsItems = [
  {
    title: 'Binarta Luhur Meluncurkan Produk Seri-Z Terbaru',
    category: 'Teknologi',
    date: '15 Juli 2024',
    description: 'Seri-Z baru kami menetapkan standar baru dalam efisiensi dan performa, menjawab tantangan industri masa kini.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'product launch event'
  },
  {
    title: 'Ekspansi Pasar Global: Binarta Luhur di Eropa',
    category: 'Bisnis',
    date: '28 Juni 2024',
    description: 'Kami dengan bangga mengumumkan pembukaan kantor cabang baru kami di Berlin untuk melayani pasar Eropa.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'european city skyline'
  },
  {
    title: 'Inisiatif Hijau Kami: Menuju Produksi Berkelanjutan',
    category: 'Lingkungan',
    date: '10 Juni 2024',
    description: 'Komitmen kami terhadap lingkungan diwujudkan melalui inisiatif produksi yang ramah lingkungan dan berkelanjutan.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'green factory'
  },
   {
    title: 'Acara Komunitas: Binarta Peduli Pendidikan',
    category: 'CSR',
    date: '25 Mei 2024',
    description: 'Kami mendukung pendidikan anak-anak di daerah terpencil melalui program donasi buku dan beasiswa.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'children reading books'
  },
];

const latestNews = newsItems[0];
const otherNews = newsItems.slice(1);

export default function NewsPreview() {
  return (
    <section id="berita" className="py-20 md:py-28 bg-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Berita Terbaru</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Ikuti perkembangan terbaru, inovasi, dan cerita dari Binarta Luhur.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Highlight Berita Terbaru */}
            <Link href="/publikasi" className="group">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <CardHeader className="p-0">
                        <div className="aspect-video relative">
                        <Image
                            src={latestNews.image}
                            alt={latestNews.title}
                            fill
                            className="object-cover"
                            data-ai-hint={latestNews.dataAiHint}
                        />
                        </div>
                    </CardHeader>
                    <div className="p-6">
                        <div className="mb-3">
                        <Badge variant="secondary" className="mr-2">{latestNews.category}</Badge>
                        <span className="text-sm text-muted-foreground">{latestNews.date}</span>
                        </div>
                        <CardTitle className="font-headline text-2xl mb-3 group-hover:text-primary transition-colors">{latestNews.title}</CardTitle>
                        <CardContent className="p-0 text-foreground/80">
                            <p>{latestNews.description}</p>
                        </CardContent>
                    </div>
                </Card>
            </Link>

            {/* Daftar Berita Lainnya */}
            <div className="flex flex-col gap-6">
                 {otherNews.map((item, index) => (
                    <div key={item.title}>
                        <Link href="/publikasi" className="group block">
                           <div className="mb-2">
                                <Badge variant="outline" className="mr-2">{item.category}</Badge>
                                <span className="text-sm text-muted-foreground">{item.date}</span>
                            </div>
                            <h3 className="font-headline text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{item.description}</p>
                        </Link>
                        {index < otherNews.length - 1 && <Separator className="mt-6" />}
                    </div>
                ))}
                <div className="mt-4">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold text-base">
                        <Link href="/publikasi">
                            Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
