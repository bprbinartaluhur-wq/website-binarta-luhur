
import { Rocket, Handshake } from 'lucide-react';

const values = [
    {
        icon: Rocket,
        title: "Cepat",
        description: "Galau menunggu kepastian? Kami berkomitmen memberikan Anda kepastian dalam 5 hari kerja*.",
        note: "*setelah berkas lengkap"
    },
    {
        icon: Handshake,
        title: "Bersahabat",
        description: "Siapapun Anda, kami selalu menempatkan Anda sebagai sahabat kami. Kepada setiap pribadi, kami berkomitmen memberikan layanan perbankan yang lebih personal.",
        note: null
    }
];

export default function CoreValues() {
  return (
    <section id="core-values" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {values.map((value, index) => (
            <div 
              key={value.title} 
              className={`relative flex flex-col items-center text-center px-4 ${index === 0 ? 'md:pr-8 md:border-r md:border-border' : 'md:pl-8'}`}
            >
              <value.icon className="h-16 w-16 mb-4 text-primary" />
              <h3 className="text-3xl font-bold font-headline text-cyan-500 mb-3">{value.title}</h3>
              <p className="text-foreground/70 max-w-sm">
                {value.description}
              </p>
              {value.note && (
                  <p className="text-xs text-foreground/50 mt-2">{value.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
