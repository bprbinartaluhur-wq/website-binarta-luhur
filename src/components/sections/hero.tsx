
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

interface CarouselItemData {
  src: string;
  alt: string;
}

async function getCarouselItems(): Promise<CarouselItemData[]> {
  try {
    const q = query(collection(firestore, "carousel"), where("status", "==", "Published"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
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
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
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
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

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
    <section className="relative w-full">
        {isLoading ? (
            <Skeleton className="w-full aspect-[3966/1632]" />
        ) : (
            <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                    <div className="w-full h-auto aspect-[2.43/1] max-h-[80vh] relative">
                        <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/30 hover:bg-black/50 border-none" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/30 hover:bg-black/50 border-none" />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <p className="text-sm text-white bg-black/40 px-3 py-1 rounded-full">
                        {current} / {count}
                    </p>
                </div>
            </Carousel>
        )}
    </section>
  );
}
