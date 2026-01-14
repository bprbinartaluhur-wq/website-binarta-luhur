
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Building, CheckCircle, Store, Move, Building2, BadgeHelp } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const timelineEvents = [
  {
    year: '1993',
    month: 'Maret',
    title: 'Pendirian BPR Binarta Luhur',
    description: 'Didirikan berdasarkan akta pendirian Nomor 04, tanggal 01 Maret 1993 di hadapan Notaris HANS KANSIL di Palu.',
    icon: Building,
  },
  {
    year: '1993',
    month: 'Agustus',
    title: 'Persetujuan Prinsip dari Departemen Keuangan',
    description: 'Menerima surat persetujuan prinsip pendirian Bank Perkreditan Rakyat dengan No: S-1270/MK.17/1993.',
    icon: CheckCircle,
  },
  {
    year: '2015',
    title: 'Pembukaan Kantor Cabang Morowali',
    description: 'Memperluas jangkauan layanan dengan membuka kantor cabang pertama di Kabupaten Morowali.',
    icon: Store,
  },
  {
    year: '2021',
    title: 'Perpindahan Kantor Pusat ke Parigi',
    description: 'Kantor pusat resmi berpindah ke Kabupaten Parigi Moutong untuk meningkatkan efektivitas operasional.',
    icon: Move,
  },
    {
    year: '2022',
    title: 'Pembukaan Kantor Kas Bahodopi & Palu',
    description: 'Membuka dua kantor kas baru secara strategis di Bahodopi, Morowali dan Kota Palu.',
    icon: Building2,
  },
  {
    year: '2024',
    title: 'Perubahan Nama Menjadi Bank Perekonomian Rakyat',
    description: 'Secara resmi bertransformasi nama menjadi Bank Perekonomian Rakyat (BPR) sesuai dengan regulasi terbaru.',
    icon: BadgeHelp,
  },
];

export default function SejarahPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <Breadcrumb items={[{label: 'Tentang Kami', href: '/tentang-kami'}, {label: 'Sejarah'}]} />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Jejak Langkah Binarta Luhur</h1>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                    Menelusuri perjalanan kami dari awal berdiri hingga menjadi lembaga keuangan yang terpercaya.
                </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                
                {timelineEvents.map((event, index) => (
                    <div key={index} className="relative mb-12">
                        <div className="flex items-center">
                            <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'hidden'}`}>
                                {index % 2 === 0 && (
                                    <div className="p-4 rounded-lg bg-card shadow-md border">
                                        <p className="font-headline text-xl font-bold text-primary">{event.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="bg-background p-2 rounded-full border-2 border-primary">
                                    <event.icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            
                            <div className={`flex-1 ${index % 2 !== 0 ? 'pl-8 text-left' : 'hidden'}`}>
                                 {index % 2 !== 0 && (
                                    <div className="p-4 rounded-lg bg-card shadow-md border">
                                        <p className="font-headline text-xl font-bold text-primary">{event.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-3.5 z-20">
                            <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-md">
                                {event.month ? `${event.month} ` : ''}{event.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
