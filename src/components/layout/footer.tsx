import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-accent text-accent-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-10 w-10 text-primary" />
              <h3 className="text-3xl font-bold font-headline">Binarta Luhur</h3>
            </div>
            <p className="text-accent-foreground/70">
              Menghadirkan inovasi dan kualitas terbaik untuk masa depan yang lebih cerah. Kami berkomitmen pada keunggulan dan kepuasan pelanggan.
            </p>
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-xl font-headline font-semibold mb-4">Lokasi Kantor</h4>
            <div className="overflow-hidden rounded-lg shadow-lg">
               <Image
                src="https://placehold.co/600x400.png"
                alt="Peta Lokasi Kantor"
                width={600}
                height={400}
                className="w-full h-auto"
                data-ai-hint="office map"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-headline font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span>Jl. Inovasi No. 123, Kawasan Industri Modern, Jakarta, Indonesia 12345</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <a href="tel:+622112345678" className="hover:text-primary transition-colors">(021) 1234-5678</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <a href="mailto:info@binartaluhur.com" className="hover:text-primary transition-colors">info@binartaluhur.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-accent-foreground/60">
          <p>&copy; {new Date().getFullYear()} Binarta Luhur. Semua Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
}
