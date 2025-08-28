import { Users, Target, Zap, HandCoins, Network, Heart, Shield, Waves, Wind, Layers } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="tentang-kami" className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Tentang Binarta Luhur</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto text-justify">
          BPR Binarta Luhur adalah lembaga keuangan yang berdiri sejak tahun 1993 dengan akta pendirian Nomor 04, tanggal 01 Maret 1993 di hadapan Notaris HANS KANSIL di Palu dan Surat Persetujuan Prinsip Pendirian Bank Perkreditan Rakyat dari departemen keuangan No: S-1270/MK.17/1993, tertanggal 04 Agustus 1993. BPR Binarta Luhur berfokus dalam penghimpunan dana masyarakat dalam bentuk Tabungan dan Deposito dan penyaluran berupa Kredit kepada masyarakat dalam rangka meningkatkan taraf hidup masyarakat khususnya dalam permodalah usaha Mikro, Kecil dan Menengah. BPR Binarta Luhur berkomitment untuk membantu permodalan untuk pengusaha di bidang perdangan, permodalan untuk pengolahan sawah pertanian untuk para petani, penggarap kebun dan peternakan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 items-start">
        <div className="space-y-8">
          <h2 className="text-3xl font-headline font-bold mb-4">Visi Kami</h2>
          <p className="text-foreground/80 text-base leading-relaxed mt-[-1rem]">
            BPR yang unggul yang ikut dalam meningkatkan kinerja UMKM serta Pembangunan di Wilayah Sulawesi Tengah
          </p>
           <h2 className="text-3xl font-headline font-bold mb-4 mt-8">Misi Kami</h2>
           <div className="space-y-6 mt-[-1rem]">
             <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <HandCoins className="h-6 w-6" />
                    </div>
                </div>
                <p className="text-foreground/80 leading-relaxed pt-3">Melakukan Pembiayaan kepada UMKM dengan pola pembiayaan terjangkau</p>
            </div>
             <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Network className="h-6 w-6" />
                    </div>
                </div>
                <p className="text-foreground/80 leading-relaxed pt-3">Memperluas Jaringan kantor di daerah tertentu Kabupaten/Kota di Sulawesi Tengah</p>
            </div>
             <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Users className="h-6 w-6" />
                    </div>
                </div>
                <p className="text-foreground/80 leading-relaxed pt-3">Menciptakan SDM yang unggul dan berkompetensi.</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
            <h2 className="text-3xl font-headline font-bold mb-4">Budaya Kerja</h2>
            <div className="space-y-6 mt-[-1rem]">
                 <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Heart className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3"><span className="font-bold">Loyalitas:</span> Setia dan berdedikasi penuh pada perusahaan dan nasabah.</p>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Shield className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3"><span className="font-bold">Unggul:</span> Selalu berusaha memberikan hasil terbaik dan melampaui ekspektasi.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Waves className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3"><span className="font-bold">Harmoni:</span> Menciptakan lingkungan kerja yang sinergis dan saling mendukung.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Wind className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3"><span className="font-bold">Ulet:</span> Tekun dan tidak mudah menyerah dalam menghadapi tantangan.</p>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Layers className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pt-3"><span className="font-bold">Rapi:</span> Bekerja dengan teratur, teliti, dan terorganisir.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
