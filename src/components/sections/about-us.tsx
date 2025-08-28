import { Users, Target, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="tentang-kami" className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Tentang Binarta Luhur</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto text-justify">
          BPR Binarta Luhur adalah lembaga keuangan yang berdiri sejak tahun 1993 dengan akta pendirian Nomor 04, tanggal 01 Maret 1993 di hadapan Notaris HANS KANSIL di Palu dan Surat Persetujuan Prinsip Pendirian Bank Perkreditan Rakyat dari departemen keuangan No: S-1270/MK.17/1993, tertanggal 04 Agustus 1993. BPR Binarta Luhur berfokus dalam penghimpunan dana masyarakat dalam bentuk Tabungan dan Deposito dan penyaluran berupa Kredit kepada masyarakat dalam rangka meningkatkan taraf hidup masyarakat khususnya dalam permodalah usaha Mikro, Kecil dan Menengah. BPR Binarta Luhur berkomitment untuk membantu permodalan untuk pengusaha di bidang perdangan, permodalan untuk pengolahan sawah pertanian untuk para petani, penggarap kebun dan peternakan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold mb-4">Visi Kami</h2>
          <p className="text-foreground/80 text-base leading-relaxed mb-6">
            BPR yang unggul yang ikut dalam meningkatkan kinerja UMKM serta Pembangunan di Wilayah Sulawesi Tengah
          </p>
           <h2 className="text-3xl font-headline font-bold mb-4">Misi Kami</h2>
          <p className="text-foreground/80 text-base leading-relaxed">
            Menjadi "BPR yang unggul yang ikut dalam meningkatkan kinerja UMKM serta Pembangunan di Wilayah Sulawesi Tengah"
          </p>
        </div>
        <div className="space-y-8">
            <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <Users className="h-8 w-8" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Kolaborasi</h3>
                    <p className="text-foreground/80">
                        Kami percaya pada kekuatan kerja tim. Kolaborasi yang erat, baik secara internal maupun dengan klien, adalah kunci keberhasilan kami.
                    </p>
                </div>
            </div>
             <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <Target className="h-8 w-8" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Integritas</h3>
                    <p className="text-foreground/80">
                       Kejujuran dan transparansi adalah pilar utama dalam setiap tindakan kami. Kami menjalankan bisnis dengan standar etika tertinggi.
                    </p>
                </div>
            </div>
             <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <Zap className="h-8 w-8" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Inovasi</h3>
                    <p className="text-foreground/80">
                       Kami tidak pernah berhenti mencari cara baru yang lebih baik. Inovasi adalah DNA kami, mendorong kami untuk terus maju dan berkembang.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
