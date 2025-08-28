import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutUsPreview() {
  return (
    <section id="tentang-kami-preview" className="container mx-auto px-4 md:px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Tentang Binarta Luhur</h2>
        <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto line-clamp-2">
          BPR Binarta Luhur adalah lembaga keuangan yang berdiri sejak tahun 1993 dengan akta pendirian Nomor 04, tanggal 01 Maret 1993 di hadapan Notaris HANS KANSIL di Palu dan Surat Persetujuan Prinsip Pendirian Bank Perkreditan Rakyat dari departemen keuangan No: S-1270/MK.17/1993, tertanggal 04 Agustus 1993. BPR Binarta Luhur berfokus dalam penghimpunan dana masyarakat dalam bentuk Tabungan dan Deposito dan penyaluran berupa Kredit kepada masyarakat dalam rangka meningkatkan taraf hidup masyarakat khususnya dalam permodalah usaha Mikro, Kecil dan Menengah. BPR Binarta Luhur berkomitment untuk membantu permodalan untuk pengusaha di bidang perdangan, permodalan untuk pengolahan sawah pertanian untuk para petani, penggarap kebun dan peternakan.
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
