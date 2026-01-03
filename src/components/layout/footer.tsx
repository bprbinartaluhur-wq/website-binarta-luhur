import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82a4.49 4.49 0 0 0-6.35 0 4.49 4.49 0 0 0-6.35 6.35L10.25 18.5l6.35-6.35a4.49 4.49 0 0 0 0-6.35Z" />
    <path d="M12.5 12.5a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1-3-3L12.5 3.5a2.12 2.12 0 0 1 0 3 2.12 2.12 0 0 1 3 3Z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);


const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: TikTokIcon, label: 'TikTok' },
  { href: '#', icon: XIcon, label: 'X' },
  { href: '#', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: Mail, label: 'Email' },
];

export default function Footer() {
  return (
    <footer id="kontak" className="bg-cream text-charcoal-light pt-12 pb-8 border-t border-orange-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-teal-600">PT BPR BINARTA LUHUR</h3>
            <p className="text-sm">Jl. Trans Sulawesi, Masigi, Kel. Masigi, Kab. Parigi Moutong</p>
            <div className="text-xs space-y-2 text-charcoal-lighter">
                <p>BPR Binarta Luhur berizin dan diawasi oleh Otoritas Jasa Keuangan & Bank Indonesia</p>
                <p>BPR Binarta Luhur merupakan peserta penjaminan LPS. Maksimum nilai simpanan yang dijamin LPS per Nasabah per Bank adalah Rp2 miliar.</p>
                <p>
                    Untuk cek Tingkat Bunga Penjaminan LPS,{' '}
                    <Link href="#" className="text-teal-600 font-semibold hover:underline">
                        klik di sini
                    </Link>
                </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col items-start md:items-end">
             <div className="border rounded-lg p-2 flex items-center gap-4 shadow-md mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-400">
                    <Phone className="h-6 w-6 text-gray-700"/>
                </div>
                <div>
                    <p className="font-semibold text-gray-500 text-sm">TANYA BINARTA</p>
                    <p className="font-bold text-xl text-orange-500 tracking-wide">(0450) 2310669</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link href={href} key={label} aria-label={label} className="text-charcoal-light hover:text-teal-600">
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-charcoal-lighter">
          <p>Copyright© BPR Binarta Luhur</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-teal-600">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-teal-600">Mekanisme Pengaduan</Link>
          </div>
        </div>
      </div>
       <Link 
            href="https://wa.me/620000000" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chat dengan kami disini
        </Link>
    </footer>
  );
}
