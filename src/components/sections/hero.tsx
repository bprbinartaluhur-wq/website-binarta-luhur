
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

interface CarouselItemData {
  src: string;
  alt: string;
}

async function getCarouselItems(): Promise<CarouselItemData[]> {
  try {
    const q = query(collection(firestore, "carousel"), where("status", "==", "Published"), orderBy("alt"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Return a default placeholder if no items are found
      return [
        {
          src: "https://placehold.co/1600x900.png",
          alt: "Selamat Datang di Binarta Luhur",
        },
      ];
    }
    return querySnapshot.docs.map(doc => ({
        src: doc.data().src,
        alt: doc.data().alt,
    }));
  } catch (error) {
    console.error("Error fetching carousel items for hero: ", error);
    // Return a default placeholder on error
    return [
      {
        src: "https://placehold.co/1600x900.png",
        alt: "Gagal memuat gambar",
      },
    ];
  }
}

export default function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [carouselItems, setCarouselItems] = React.useState<CarouselItemData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
        const items = await getCarouselItems();
        setCarouselItems(items);
        setIsLoading(false);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    if (!api || isLoading) {
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
  }, [api, isLoading]);

  return (
    <section className="relative w-full">
        {isLoading ? (
            <Skeleton className="w-full aspect-[3966/1632]" />
        ) : (
            <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                    <div className="w-full h-auto aspect-[3966/1632] max-h-[80vh] relative">
                        <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        )}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-lg">
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter drop-shadow-lg">
            Inovasi Membangun Masa Depan
          </h1>
          <p className="mt-4 max-w-2xl text-md md:text-xl text-neutral-200 drop-shadow-md">
            Temukan solusi terdepan dari Binarta Luhur yang dirancang untuk keunggulan dan ketahanan.
          </p>
          <Button asChild size="lg" className="mt-6 md:mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform hover:scale-105">
            <Link href="#produk">Jelajahi Produk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
