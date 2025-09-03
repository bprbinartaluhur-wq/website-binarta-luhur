import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-accent text-accent-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Binarta Luhur" width={270} height={68} data-ai-hint="company logo" />
            </div>
            <p className="text-accent-foreground/70">
              Menghadirkan inovasi dan kualitas terbaik untuk masa depan yang lebih cerah. Kami berkomitmen pada keunggulan dan kepuasan pelanggan.
            </p>
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-xl font-headline font-semibold mb-4">Lokasi Kantor</h4>
            <div className="overflow-hidden rounded-lg shadow-lg">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7978.845008924817!2d120.1659454676321!3d-0.8070701185183247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwNDgnMjUuNSJTIDEyMMKwMTAnMjAuMyJF!5e0!3m2!1sid!2sid!4v1737950805716!5m2!1sid!2sid"
                width="600"
                height="450"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-headline font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span>Jl. Trans Sulawesi, Masigi, Kel. Masigi, Kab. Parigi Moutong</span>
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
