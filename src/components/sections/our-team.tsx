
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  dataAiHint?: string;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const q = query(collection(firestore, 'team'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [
        { id: '1', name: 'Budi Santoso', role: 'Chief Executive Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait' },
        { id: '2', name: 'Citra Lestari', role: 'Chief Technology Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional woman portrait' },
        { id: '3', name: 'Agus Wijaya', role: 'Chief Operating Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'male executive portrait' },
        { id: '4', name: 'Dewi Anggraini', role: 'Head of Marketing', image: 'https://placehold.co/400x400.png', dataAiHint: 'female executive portrait' },
      ];
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
  } catch (error) {
    console.error("Error fetching team members: ", error);
    // Return placeholder data on error
    return [
        { id: '1', name: 'Budi Santoso', role: 'Chief Executive Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait' },
        { id: '2', name: 'Citra Lestari', role: 'Chief Technology Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional woman portrait' },
        { id: '3', name: 'Agus Wijaya', role: 'Chief Operating Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'male executive portrait' },
        { id: '4', name: 'Dewi Anggraini', role: 'Head of Marketing', image: 'https://placehold.co/400x400.png', dataAiHint: 'female executive portrait' },
    ];
  }
}

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const items = await getTeamMembers();
      setTeamMembers(items);
      setIsLoading(false);
    }
    fetchData();
  }, []);

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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <CardHeader className="p-0">
                   <Skeleton className="aspect-square w-full" />
                </CardHeader>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardContent>
              </Card>
            ))
          ) : (
            teamMembers.map((member) => (
              <Card key={member.id} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="aspect-square relative">
                      <Image
                          src={member.image}
                          alt={`Potret ${member.name}`}
                          fill
                          className="object-cover"
                          data-ai-hint={member.dataAiHint}
                          unoptimized
                      />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-headline text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
