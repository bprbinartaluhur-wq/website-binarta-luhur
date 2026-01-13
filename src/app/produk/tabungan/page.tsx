
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const savingProducts = [
  {
    title: "Tabungan Binarta",
    description: "Solusi simpanan dengan setoran awal yang ringan dan bebas biaya administrasi bulanan.",
    image: "https://picsum.photos/seed/savings1/600/400",
    dataAiHint: "piggy bank savings",
    benefits: [
      "Setoran awal ringan",
      "Bebas biaya administrasi bulanan",
      "Suku bunga kompetitif",
      "Dijamin oleh LPS",
    ],
  },
  {
    title: "Tabungan Junior",
    description: "Ajarkan si kecil menabung sejak dini dengan tabungan khusus anak yang mudah dan mendidik.",
    image: "https://picsum.photos/seed/savings2/600/400",
    dataAiHint: "child saving money",
    benefits: [
      "Mendidik anak tentang keuangan",
      "Desain buku tabungan menarik",
      "Setoran awal sangat terjangkau",
      "Tidak ada biaya administrasi",
    ],
  },
  {
    title: "Tabungan Rencana",
    description: "Wujudkan impian Anda dengan tabungan berjangka yang disiplin dan menguntungkan.",
    image: "https://picsum.photos/seed/savings3/600/400",
    dataAiHint: "planning vacation travel",
    benefits: [
      "Membantu mencapai tujuan finansial",
      "Sistem autodebet bulanan",
      "Jangka waktu fleksibel",
      "Suku bunga lebih tinggi",
    ],
  },
];

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
        <span>{children}</span>
    </li>
);


export default function TabunganPage() {
  return (
    (<div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pb-20">
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
            <div className="absolute inset-0 bg-gradient-to-r from-background from-30% to-transparent z-20" />
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
                {savingProducts.map((product) => (
                    <Card key={product.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden rounded-lg">
                         <div className="relative aspect-video">
                            <Image
                                src={product.image}
                                alt={`Ilustrasi ${product.title}`}
                                fill
                                className="object-cover"
                                data-ai-hint={product.dataAiHint}
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-foreground/80">{product.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>)
  );
}
