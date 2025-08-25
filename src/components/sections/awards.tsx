import { Award, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const awards = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Inovasi Terbaik 2023',
    description: 'Diakui untuk solusi terobosan di bidang teknologi industri.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Efisiensi Energi No. 1',
    description: 'Peringkat tertinggi untuk produk dengan konsumsi daya paling efisien.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Kualitas Terjamin',
    description: 'Sertifikasi standar internasional untuk kualitas dan keandalan produk.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Pertumbuhan Tercepat',
    description: 'Penghargaan sebagai perusahaan dengan pertumbuhan tercepat di sektornya.',
  },
];

export default function Awards() {
  return (
    <section id="penghargaan" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Penghargaan & Pengakuan</h2>
          <p className="mt-4 text-lg text-secondary-foreground/70 max-w-3xl mx-auto">
            Dedikasi kami terhadap keunggulan telah diakui oleh berbagai lembaga terkemuka.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award) => (
            <Card key={award.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                  {award.icon}
                </div>
                <CardTitle className="font-headline text-xl">{award.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground/80">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
