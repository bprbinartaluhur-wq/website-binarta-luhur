import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutUsPreview() {
  return (
    <section id="tentang-kami-preview" className="container mx-auto px-4 md:px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Tentang Binarta Luhur</h2>
        <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
          BPR Binarta Luhur adalah lembaga keuangan yang berdiri sejak tahun 1993...
        </p>
        <div className="mt-8">
           <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold text-lg">
              <Link href="/tentang-kami">
                  Baca Lebih Lengkap <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
