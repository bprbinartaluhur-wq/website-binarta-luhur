
import Image from 'next/image';
import Link from 'next/link';

const productItems = [
  {
    title: 'Tabungan',
    description: 'Rencanakan masa depan finansial Anda dengan produk tabungan kami yang fleksibel dan aman.',
    image: 'https://picsum.photos/seed/tabungan/600/800',
    link: '/produk/tabungan',
    dataAiHint: 'people meeting savings',
  },
  {
    title: 'Deposito',
    description: 'Investasi cerdas dengan keuntungan optimal melalui produk deposito berjangka kami.',
    image: 'https://picsum.photos/seed/deposito/600/800',
    link: '/produk/deposito',
    dataAiHint: 'investment discussion coffee',
  },
  {
    title: 'Kredit',
    description: 'Wujudkan berbagai kebutuhan Anda dengan solusi pinjaman yang cepat, mudah, dan terpercaya.',
    image: 'https://picsum.photos/seed/kredit/600/800',
    link: '/produk/pinjaman',
    dataAiHint: 'couple planning loan',
  },
];

export default function Products() {
  return (
    <section id="produk" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {productItems.map((item) => (
          <Link href={item.link} key={item.title} className="group relative block overflow-hidden h-96 md:h-auto md:aspect-[3/4]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint}
            />
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out group-hover:bg-primary/80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
                 <div className="transform transition-all duration-500 ease-in-out group-hover:-translate-y-2">
                    <h3 className="font-headline text-4xl font-bold">{item.title}</h3>
                    <p className="mt-2 max-w-xs text-base opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                        {item.description}
                    </p>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
