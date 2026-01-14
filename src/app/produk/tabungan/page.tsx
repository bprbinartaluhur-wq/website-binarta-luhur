
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { firestore } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface SavingProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  dataAiHint?: string;
}

export default function TabunganPage() {
  const [savingProducts, setSavingProducts] = useState<SavingProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavingProducts = async () => {
      try {
        const q = query(
          collection(firestore, "products"), 
          where("category", "==", "Tabungan"),
          where("status", "==", "Published"),
          orderBy("name")
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            image: data.image,
            link: `/produk/tabungan/${doc.id}`,
            dataAiHint: 'savings product',
          } as SavingProduct;
        });
        setSavingProducts(products);
      } catch (error) {
        console.error("Error fetching saving products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavingProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <Breadcrumb items={[{label: 'Produk', href: '/produk'}, {label: 'Tabungan'}]} />
        <section
          className="relative w-full h-[50vh] min-h-[300px] md:h-[60vh] max-h-[600px] bg-background text-foreground overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute z-10 inset-y-0 right-0 w-3/4">
                <Image
                src="/banner_tab.png"
                alt="Layanan nasabah di kantor Binarta Luhur"
                fill
                className="object-cover object-right-bottom"
                priority
                data-ai-hint="customer service meeting" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/70 to-transparent z-20" />
          </div>
          
          <div
            className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-center z-30">
            <div className="max-w-md space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline">
                Tabungan
              </h1>
              <p className="text-base md:text-lg">
                Tabungan Binarta dibuat untuk memenuhi semua kebutuhan simpanan masyarakat yang aman dan terpercaya.
              </p>
            </div>
            <a href="#produk-tabungan"
              className="absolute bottom-8 left-1/2 md:left-auto md:translate-x-0 transform -translate-x-1/2 md:left-1/2">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            </a>
          </div>
        </section>
        
        <section id="produk-tabungan" className="container mx-auto px-4 md:px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  Array.from({length: 3}).map((_, index) => (
                    <Card key={index} className="aspect-[4/5] overflow-hidden rounded-lg">
                      <Skeleton className="w-full h-full" />
                    </Card>
                  ))
                ) : (
                  savingProducts.map((product) => (
                      <Link href={product.link} key={product.id}>
                          <Card className="group relative shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg aspect-[4/5]">
                              <Image
                                  src={product.image}
                                  alt={`Ilustrasi ${product.name}`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  data-ai-hint={product.dataAiHint}
                                  unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{product.name}</CardTitle>
                                  <p className="mt-2 text-white/90 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{product.description}</p>
                              </div>
                          </Card>
                      </Link>
                  ))
                )}
                 {!isLoading && savingProducts.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">Belum ada produk tabungan yang tersedia.</p>
                  </div>
                )}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
