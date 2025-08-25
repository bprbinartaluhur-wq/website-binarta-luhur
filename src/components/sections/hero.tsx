'use client';

import * as React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const carouselItems = [
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 1",
    dataAiHint: "modern technology"
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 2",
    dataAiHint: "sleek product"
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 3",
    dataAiHint: "industrial design"
  },
];

export default function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative h-screen min-h-[600px] w-full">
      <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-screen min-h-[600px] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={item.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter drop-shadow-lg">
            Inovasi Membangun Masa Depan
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-md">
            Temukan solusi terdepan dari Binarta Luhur yang dirancang untuk keunggulan dan ketahanan.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform hover:scale-105">
            <Link href="#produk">Jelajahi Produk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
