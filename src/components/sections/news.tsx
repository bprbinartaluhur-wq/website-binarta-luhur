import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
];

export default function News() {
  return (
    <section id="berita" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Berita Terbaru</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Ikuti perkembangan terbaru, inovasi, dan cerita dari Binarta Luhur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.dataAiHint}
                  />
                </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <Badge variant="secondary" className="mr-2">{item.category}</Badge>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <CardTitle className="font-headline text-xl mb-3">{item.title}</CardTitle>
                <CardContent className="p-0 text-foreground/80 flex-grow">
                  <p>{item.description}</p>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button asChild className="w-full bg-primary hover:bg-accent text-primary-foreground">
                    <Link href="#">Baca Selengkapnya</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
