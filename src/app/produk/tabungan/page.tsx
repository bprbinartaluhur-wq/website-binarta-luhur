
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function TabunganPage() {
  return (
    (<div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <section
          className="relative w-full h-[50vh] min-h-[300px] md:h-[60vh] max-h-[600px] text-foreground">
          <div className="absolute inset-0">
            <Image
              src="/Tab_Binarta.png"
              alt="Layanan nasabah di kantor Binarta Luhur"
              fill
              className="object-cover"
              priority
              data-ai-hint="customer service meeting" />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div
            className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-center">
            <div className="max-w-md space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline">
                Tabungan
              </h1>
              <p className="text-base md:text-lg">
                Produk Tabungan di BPR Binarta Luhur dirancang untuk Anda yang menginginkan program Tabungan menarik, berkualitas, dan berhadiah langsung.
              </p>
            </div>
            <div
              className="absolute bottom-8 left-1/2 md:left-auto md:-translate-x-1/2">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Konten selanjutnya akan ditambahkan di sini */}

      </main>
      <Footer />
    </div>)
  );
}
