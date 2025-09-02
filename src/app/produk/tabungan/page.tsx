
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const savingsProducts = [
  {
    value: "item-1",
    title: "Tabungan Binarta",
    description: "Tabungan yang diperuntukkan untuk masyarakat umum dengan berbagai kemudahan dan keuntungan.",
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
    value: "item-2",
    title: "Tabungan Luhur",
    description: "Tabungan dengan sistem kontrak dengan bunga menarik, cocok untuk investasi yang fleksibel.",
    benefits: [
      "Tabungan berjangka dengan bunga kompetitif",
      "Syarat mudah",
      "Suku bunga menarik",
      "Simpanan dijamin LPS",
      "Setoran mulai Rp.10.000,-",
      "Bebas menentukan jangka waktu antara 12, 24 atau 36 bulan",
    ],
    requirements: [], // No requirements specified
  },
  {
    value: "item-3",
    title: "TabunganKu",
    description: "Tabungan yang cocok untuk anak sekolah, bebas administrasi dengan bunga yang menarik.",
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
            <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
                <div className="relative h-56 w-full">
                    <Image 
                        src="https://picsum.photos/800/300"
                        alt="Ilustrasi menabung"
                        fill
                        className="object-cover"
                        data-ai-hint="savings illustration"
                    />
                </div>
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl md:text-5xl font-headline">Produk Tabungan</CardTitle>
                    <p className="text-lg text-muted-foreground pt-2">
                        Pilih solusi tabungan terbaik yang sesuai dengan kebutuhan Anda.
                    </p>
                </CardHeader>
                <CardContent className="px-2 md:px-6">
                    <Accordion type="single" collapsible className="w-full">
                       {savingsProducts.map((product) => (
                         <AccordionItem value={product.value} key={product.value}>
                            <AccordionTrigger className="text-xl font-headline px-4 hover:bg-secondary/50 rounded-md">
                                {product.title}
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-2 px-4">
                                <p className="text-base text-foreground/80 mb-6">{product.description}</p>
                                <div className="grid md:grid-cols-2 gap-8">
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
                            </AccordionContent>
                        </AccordionItem>
                       ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
