
import Image from 'next/image';
import Link from 'next/link';

const productItems = [
  {
    title: 'Tabungan',
    description: 'Rencanakan masa depan finansial Anda dengan produk tabungan kami yang fleksibel dan aman.',
    image: 'https://picsum.photos/seed/tabungan/600/800',
    link: '/produk/tabungan',
    dataAiHint: 'people meeting savings',
    featured: true,
  },
  {
    title: 'Deposito',
    description: 'Investasi cerdas dengan keuntungan optimal melalui produk deposito berjangka kami.',
    image: 'https://picsum.photos/seed/deposito/600/400',
    link: '/produk/deposito',
    dataAiHint: 'investment discussion coffee',
  },
  {
    title: 'Kredit',
    description: 'Wujudkan berbagai kebutuhan Anda dengan solusi pinjaman yang cepat, mudah, dan terpercaya.',
    image: 'https://picsum.photos/seed/kredit/600/400',
    link: '/produk/pinjaman',
    dataAiHint: 'couple planning loan',
  },
];

export default function Products() {
  const featuredProduct = productItems.find((p) => p.featured);
  const otherProducts = productItems.filter((p) => !p.featured);

  return (
    <section id="produk" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {featuredProduct && (
          <Link href={featuredProduct.link} className="group relative col-span-1 md:col-span-1 block overflow-hidden">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={featuredProduct.dataAiHint}
              />
              <div className="absolute inset-0 bg-primary/80 flex flex-col justify-center items-center text-center p-8">
                <h3 className="font-headline text-4xl font-bold text-primary-foreground mb-4">{featuredProduct.title}</h3>
                <p className="text-primary-foreground/90 max-w-sm">{featuredProduct.description}</p>
              </div>
            </div>
          </Link>
        )}
        
        <div className="grid grid-cols-1">
          {otherProducts.map((item) => (
            <Link href={item.link} key={item.title} className="group relative block overflow-hidden">
                <div className="relative w-full aspect-video">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.dataAiHint}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <h3 className="font-headline text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
