import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const productItems = [
  {
    title: 'Tabungan',
    description: 'Rencanakan masa depan finansial Anda dengan produk tabungan kami yang fleksibel dan aman.',
    image: 'https://placehold.co/600x400.png',
    link: '/produk/tabungan',
    dataAiHint: 'piggy bank savings'
  },
  {
    title: 'Deposito',
    description: 'Investasi cerdas dengan keuntungan optimal melalui produk deposito berjangka kami.',
    image: 'https://placehold.co/600x400.png',
    link: '/produk/deposito',
    dataAiHint: 'investment growth chart'
  },
  {
    title: 'Pinjaman',
    description: 'Wujudkan berbagai kebutuhan Anda dengan solusi pinjaman yang cepat, mudah, dan terpercaya.',
    image: 'https://placehold.co/600x400.png',
    link: '/produk/pinjaman',
    dataAiHint: 'house keys loan'
  },
];

export default function Products() {
  return (
    <section id="produk" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Produk Unggulan Kami</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Jelajahi berbagai solusi finansial yang kami tawarkan untuk memenuhi setiap kebutuhan Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productItems.map((item) => (
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
                <CardTitle className="font-headline text-2xl mb-2">{item.title}</CardTitle>
                <CardContent className="p-0 text-foreground/80 flex-grow mb-4">
                  <p>{item.description}</p>
                </CardContent>
                <CardFooter className="p-0 mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                        <Link href={item.link}>
                            Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
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
