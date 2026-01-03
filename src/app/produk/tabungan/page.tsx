
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

export default function TabunganPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <section className="relative w-full h-64 md:h-80">
            <Image
                src="/Tab_Binarta.png"
                alt="Banner Produk Tabungan"
                fill
                className="object-cover"
                priority
                data-ai-hint="savings banner"
            />
            <div className="absolute inset-0 bg-black/30" />
        </section>
        
        {/* Konten selanjutnya akan ditambahkan di sini */}

      </main>
      <Footer />
    </div>
  );
}
