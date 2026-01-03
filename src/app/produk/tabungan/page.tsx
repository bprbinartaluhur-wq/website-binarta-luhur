
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
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Tabungan</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl">
                    Tabungan binarta dibuat untuk memenuhi semua kebutuhan simpanan masyarakat yang aman dan terpercaya.
                </p>
            </div>
        </section>
        
        {/* Konten selanjutnya akan ditambahkan di sini */}

      </main>
      <Footer />
    </div>
  );
}
