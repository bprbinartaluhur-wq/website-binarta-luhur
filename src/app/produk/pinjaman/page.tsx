
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const loanProducts = [
  {
    title: "Kredit Modal Kerja",
    description: "Solusi pembiayaan untuk mendukung kebutuhan modal kerja dan operasional usaha Anda.",
    image: "https://picsum.photos/600/400?random=7",
    dataAiHint: "business meeting handshake",
  },
  {
    title: "Kredit Investasi",
    description: "Fasilitas kredit untuk pembelian aset produktif dan ekspansi bisnis jangka panjang.",
    image: "https://picsum.photos/600/400?random=8",
    dataAiHint: "factory machine industry",
  },
  {
    title: "Kredit Bina Slamet",
    description: "Produk pinjaman yang dirancang khusus untuk mendukung pengembangan usaha kecil dan mikro.",
    image: "https://picsum.photos/600/400?random=9",
    dataAiHint: "small business owner",
  },
  {
    title: "Kredit Multi Guna",
    description: "Pinjaman fleksibel untuk berbagai kebutuhan konsumtif Anda dengan proses yang mudah.",
    image: "https://picsum.photos/600/400?random=10",
    dataAiHint: "happy family vacation",
  },
  {
    title: "Kredit Konsumtif",
    description: "Wujudkan kebutuhan pribadi Anda, mulai dari renovasi rumah hingga biaya pendidikan.",
    image: "https://picsum.photos/600/400?random=11",
    dataAiHint: "home renovation blueprint",
  },
];

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
        <span>{children}</span>
    </li>
);

export default function PinjamanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
         <Breadcrumb items={[{label: 'Produk', href: '/produk'}, {label: 'Pinjaman'}]} />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <Card className="max-w-5xl mx-auto shadow-lg border-none overflow-hidden">
                <div className="relative w-full h-48 bg-accent">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-4xl md:text-5xl font-headline text-accent-foreground">Produk Pinjaman</h1>
                    </div>
                </div>
                <CardHeader className="text-center pb-12">
                    <p className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
                        Temukan solusi pinjaman yang tepat untuk mewujudkan setiap rencana dan kebutuhan Anda.
                    </p>
                </CardHeader>
                <CardContent className="space-y-16 px-6 md:px-8 pb-12">
                    {loanProducts.map((product, index) => (
                        <div key={product.title}>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-headline font-bold text-foreground">{product.title}</h2>
                                    <p className="text-base text-foreground/80">{product.description}</p>
                                    
                                    <div className="pt-4">
                                        <h3 className="font-bold text-lg mb-3 font-headline">Informasi Detail</h3>
                                        <p className="text-foreground/80">
                                            Informasi mengenai keuntungan dan persyaratan untuk produk ini akan segera tersedia. Hubungi kami untuk detail lebih lanjut.
                                        </p>
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
                            {index < loanProducts.length - 1 && <Separator className="mt-16" />}
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
