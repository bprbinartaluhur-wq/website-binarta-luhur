import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const products = [
  {
    name: 'Mesin Cerdas X-100',
    description: 'Optimalisasi proses industri Anda dengan mesin cerdas yang efisien dan andal.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'industrial machinery',
  },
  {
    name: 'Platform Analitik Data',
    description: 'Ubah data menjadi wawasan berharga dengan platform analitik kami yang canggih.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analytics dashboard',
  },
  {
    name: 'Solusi Energi Terbarukan',
    description: 'Kontribusi pada lingkungan dengan solusi energi bersih dan berkelanjutan.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panels wind turbine',
  },
];

export default function Products() {
  return (
    <section id="produk" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Produk Unggulan</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Kami menawarkan berbagai produk inovatif yang dirancang untuk memenuhi kebutuhan industri modern.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                    <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint}
                    />
                </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="font-headline text-2xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-base flex-grow">{product.description}</CardDescription>
                <Button className="mt-6 w-full" variant="outline">
                    Pelajari Lebih Lanjut
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
