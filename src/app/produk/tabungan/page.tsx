
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

export default function TabunganPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <section className="relative w-full h-64 md:h-96">
            <div className="absolute inset-0">
                <Image
                    src="/Tab_Binarta.png"
                    alt="Banner Produk Tabungan"
                    fill
                    className="object-cover object-right"
                    priority
                    data-ai-hint="savings banner family"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-center text-left">
                <div className="max-w-md text-foreground">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">Tabungan</h1>
                    <p className="mt-4 text-lg md:text-xl">
                        Tabungan binarta dibuat untuk memenuhi semua kebutuhan simpanan masyarakat yang aman dan terpercaya.
                    </p>
                </div>
            </div>
        </section>
        
        {/* Konten selanjutnya akan ditambahkan di sini */}

      </main>
      <Footer />
    </div>
  );
}
