import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const depositProducts = [
  {
    title: "Deposito Binarta",
    description: "Pilihan investasi aman dengan suku bunga kompetitif dan persyaratan yang mudah.",
    image: "https://picsum.photos/600/400?random=4",
    dataAiHint: "secure investment safe",
    benefits: [
      "Syarat mudah",
      "Suku bunga menarik",
      "Deposito Mulai dari 5 Juta Rupiah",
      "Jangka Waktu Mulai dari 3 Bulan",
      "Bebas biaya administrasi",
      "Simpanan dijamin LPS",
    ],
    requirements: [
      "Foto Copy Identitas yang masih berlaku",
      "Mengisi Formulir Pembukaan Tabungan",
      "Setoran awal pembukaan tabungan",
    ],
  },
  {
    title: "Deposito DBOC",
    description: "Deposito fleksibel untuk kebutuhan investasi Anda dengan nominal yang lebih besar dan bunga optimal.",
    image: "https://picsum.photos/600/400?random=5",
    dataAiHint: "flexible investment money",
    benefits: [
        "Deposito flexibel untuk kebutuhan anda",
        "Syarat mudah",
        "Suku bunga menarik",
        "Deposito mulai dari 100.000.000 Rupiah",
        "Simpanan dijamin LPS",
        "Bebas menentukan jangka waktu antara 3, 12, 24 atau 36 bulan",
    ],
    requirements: [
        "Foto Copy Identitas yang masih berlaku",
        "Setoran awal pembukaan Deposito",
        "Mengisi Formulir Aplikasi Deposito",
    ],
  },
];


const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
        <span>{children}</span>
    </li>
);

export default function DepositoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-5xl mx-auto shadow-lg border-none overflow-hidden">
                <div className="relative w-full h-48">
                    <Image
                        src="https://picsum.photos/800/200?random=6"
                        alt="Ilustrasi Produk Deposito"
                        fill
                        className="object-cover"
                        data-ai-hint="secure finance illustration"
                    />
                </div>
                <CardHeader className="text-center pb-12">
                    <CardTitle className="text-4xl md:text-5xl font-headline">Produk Deposito</CardTitle>
                    <p className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
                        Maksimalkan potensi dana Anda dengan solusi deposito yang aman dan menguntungkan.
                    </p>
                </CardHeader>
                <CardContent className="space-y-16 px-6 md:px-8 pb-12">
                    {depositProducts.map((product, index) => (
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
                            {index < depositProducts.length - 1 && <Separator className="mt-16" />}
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
