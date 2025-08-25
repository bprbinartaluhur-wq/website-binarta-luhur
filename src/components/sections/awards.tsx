import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, Trophy, Zap } from 'lucide-react';

const awards = [
  {
    icon: Trophy,
    title: 'Inovasi Terbaik 2023',
    description: 'Diakui untuk solusi terobosan di bidang teknologi industri.',
  },
  {
    icon: Star,
    title: 'Kualitas Terjamin',
    description: 'Sertifikasi standar internasional untuk kualitas dan keandalan produk.',
  },
  {
    icon: Zap,
    title: 'Efisiensi Energi No. 1',
    description: 'Peringkat tertinggi untuk produk dengan konsumsi daya paling efisien.',
  },
  {
    icon: Award,
    title: 'Pertumbuhan Tercepat',
    description: 'Penghargaan sebagai perusahaan dengan pertumbuhan tercepat di sektornya.',
  },
];

export default function Awards() {
  return (
    <section id="penghargaan" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Penghargaan Kami</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Dedikasi kami pada keunggulan telah diakui melalui berbagai penghargaan bergengsi.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <award.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-xl">{award.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
