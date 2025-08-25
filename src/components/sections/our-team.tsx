import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Budi Santoso',
    role: 'Chief Executive Officer',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'professional man portrait',
  },
  {
    name: 'Citra Lestari',
    role: 'Chief Technology Officer',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'professional woman portrait',
  },
  {
    name: 'Agus Wijaya',
    role: 'Chief Operating Officer',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'male executive portrait',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Head of Marketing',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'female executive portrait',
  },
];

export default function OurTeam() {
  return (
    <section id="tim-kami" className="pb-20 md:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Tim Profesional Kami</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Bertemu dengan para pemimpin di balik inovasi dan kesuksesan Binarta Luhur.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <Image
                        src={member.image}
                        alt={`Potret ${member.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={member.dataAiHint}
                    />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="font-headline text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
