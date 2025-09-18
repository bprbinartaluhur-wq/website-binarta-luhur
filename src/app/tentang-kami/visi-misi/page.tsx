
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Goal, Users, HandCoins, Network, Heart, Shield, Waves, Wind, Layers } from 'lucide-react';

const missionItems = [
    {
        icon: HandCoins,
        text: 'Melakukan Pembiayaan kepada UMKM dengan pola pembiayaan terjangkau.',
    },
    {
        icon: Network,
        text: 'Memperluas Jaringan kantor di daerah tertentu Kabupaten/Kota di Sulawesi Tengah.',
    },
    {
        icon: Users,
        text: 'Menciptakan SDM yang unggul dan berkompetensi.',
    },
];

const cultureItems = [
    { icon: Heart, title: 'Loyalitas', description: 'Setia dan berdedikasi penuh pada perusahaan dan nasabah.' },
    { icon: Shield, title: 'Unggul', description: 'Selalu berusaha memberikan hasil terbaik dan melampaui ekspektasi.' },
    { icon: Waves, title: 'Harmoni', description: 'Menciptakan lingkungan kerja yang sinergis dan saling mendukung.' },
    { icon: Wind, title: 'Ulet', description: 'Tekun dan tidak mudah menyerah dalam menghadapi tantangan.' },
    { icon: Layers, title: 'Rapi', description: 'Bekerja dengan teratur, teliti, dan terorganisir.' },
];

export default function VisiMisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Arah dan Nilai Perusahaan</h1>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                    Fondasi yang memandu setiap langkah kami dalam memberikan pelayanan terbaik dan berkelanjutan.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
                 <Card className="shadow-lg">
                    <CardHeader className="flex-row items-center gap-4 pb-4">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <Target className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Visi Kami</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80 text-lg leading-relaxed">
                            Menjadi BPR yang unggul yang ikut dalam meningkatkan kinerja UMKM serta Pembangunan di Wilayah Sulawesi Tengah.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader className="flex-row items-center gap-4 pb-4">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <Goal className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Misi Kami</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {missionItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <item.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                                    <span className="text-foreground/80 text-base">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Budaya Kerja LUHUR</h2>
                 <p className="mt-3 text-md text-foreground/70 max-w-2xl mx-auto">
                    Lima pilar utama yang menjadi landasan etos kerja dan identitas kami.
                </p>
            </div>
             <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cultureItems.map((item) => (
                    <Card key={item.title} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                             <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-3">
                                <item.icon className="h-7 w-7" />
                            </div>
                            <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-foreground/80 text-sm">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
