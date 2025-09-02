
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const savingsProducts = [
  {
    title: "Tabungan Binarta",
    description: "Tabungan yang diperuntukkan untuk masyarakat umum dengan berbagai kemudahan dan keuntungan.",
    image: "https://picsum.photos/600/400?random=1",
    dataAiHint: "general savings people",
    benefits: [
      "Syarat mudah",
      "Suku bunga menarik",
      "Bebas biaya administrasi",
      "Simpanan dijamin LPS",
      "Dapat diambil sewaktu-waktu",
    ],
    requirements: [
      "Foto Copy Identitas yang masih berlaku",
      "Setoran awal pembukaan tabungan",
      "Mengisi Formulir Aplikasi Tabungan",
    ],
  },
  {
    title: "Tabungan Luhur",
    description: "Tabungan dengan sistem kontrak dengan bunga menarik, cocok untuk investasi yang fleksibel.",
    image: "https://picsum.photos/600/400?random=2",
    dataAiHint: "investment growth flexible",
    benefits: [
      "Tabungan berjangka dengan bunga kompetitif",
      "Syarat mudah",
      "Suku bunga menarik",
      "Simpanan dijamin LPS",
      "Setoran mulai Rp.10.000,-",
      "Bebas menentukan jangka waktu antara 12, 24 atau 36 bulan",
    ],
    requirements: [],
  },
  {
    title: "TabunganKu",
    description: "Tabungan yang cocok untuk anak sekolah, bebas administrasi dengan bunga yang menarik.",
    image: "https://picsum.photos/600/400?random=3",
    dataAiHint: "student savings happy",
    benefits: [
      "Syarat mudah karena merupakan program pemerintah",
      "Suku bunga menarik",
      "Bebas biaya administrasi",
      "Simpanan dijamin LPS",
      "Diperuntukkan bagi Pelajar",
    ],
    requirements: [
      "Foto Copy Identitas yang masih berlaku",
      "Setoran awal pembukaan tabungan",
      "Mengisi Formulir Aplikasi Tabungan",
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-5xl mx-auto shadow-lg border-none">
                <CardHeader className="text-center pb-12">
                    <CardTitle className="text-4xl md:text-5xl font-headline">Produk Tabungan</CardTitle>
                    <p className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
                        Pilih solusi tabungan terbaik yang dirancang untuk memenuhi setiap tahap kehidupan finansial Anda.
                    </p>
                </CardHeader>
                <CardContent className="space-y-16">
                    {savingsProducts.map((product, index) => (
                        <div key={product.title}>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-headline font-bold text-foreground">{product.title}</h2>
                                    <p className="text-base text-foreground/80">{product.description}</p>
                                    
                                    <div className="space-y-6 pt-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-3 font-headline">Keuntungan</h3>
                                            <ul className="space-y-2 text-foreground/80">
                                                {product.benefits.map((benefit, i) => (
                                                    <ListItem key={i}>{benefit}</ListItem>
                                                ))}
                                            </ul>
                                        </div>
                                        {product.requirements.length > 0 && (
                                          <div>
                                              <h3 className="font-bold text-lg mb-3 font-headline">Persyaratan</h3>
                                              <ul className="space-y-2 text-foreground/80">
                                                  {product.requirements.map((req, i) => (
                                                      <ListItem key={i}>{req}</ListItem>
                                                  ))}
                                              </ul>
                                          </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src={product.image}
                                        alt={`Ilustrasi ${product.title}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={product.dataAiHint}
                                    />
                                </div>
                            </div>
                            {index < savingsProducts.length - 1 && <Separator className="mt-16" />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
