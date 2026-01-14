
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Waves, Wind, Layers } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const cultureItems = [
    { icon: Heart, title: 'Loyalitas', description: 'Setia dan berdedikasi penuh pada perusahaan dan nasabah.' },
    { icon: Shield, title: 'Unggul', description: 'Selalu berusaha memberikan hasil terbaik dan melampaui ekspektasi.' },
    { icon: Waves, title: 'Harmoni', description: 'Menciptakan lingkungan kerja yang sinergis dan saling mendukung.' },
    { icon: Wind, title: 'Ulet', description: 'Tekun dan tidak mudah menyerah dalam menghadapi tantangan.' },
    { icon: Layers, title: 'Rapi', description: 'Bekerja dengan teratur, teliti, dan terorganisir.' },
];

export default function BudayaKerjaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <Breadcrumb items={[{label: 'Tentang Kami', href: '/tentang-kami'}, {label: 'Budaya Kerja'}]} />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Budaya Kerja LUHUR</h1>
                 <p className="mt-3 text-lg text-foreground/70 max-w-2xl mx-auto">
                    Lima pilar utama yang menjadi landasan etos kerja dan identitas kami dalam memberikan pelayanan terbaik.
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
