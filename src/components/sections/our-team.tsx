
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
  order: number;
  dataAiHint?: string;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const q = query(collection(firestore, 'team'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [
        { id: '1', name: 'Nama Anggota', role: 'Komisaris Utama', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait', order: 1 },
        { id: '2', name: 'Nama Anggota', role: 'Komisaris', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional woman portrait', order: 2 },
        { id: '3', name: 'Nama Anggota', role: 'Direktur Utama', image: 'https://placehold.co/400x400.png', dataAiHint: 'male executive portrait', order: 3 },
        { id: '4', name: 'Nama Anggota', role: 'Direktur Operasional', image: 'https://placehold.co/400x400.png', dataAiHint: 'female executive portrait', order: 4 },
        { id: '5', name: 'Nama Anggota', role: 'Direktur Kepatuhan', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait', order: 5 },
      ];
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
  } catch (error) {
    console.error("Error fetching team members: ", error);
    // Return placeholder data on error
    return [
      { id: '1', name: 'Nama Anggota', role: 'Komisaris Utama', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait', order: 1 },
      { id: '2', name: 'Nama Anggota', role: 'Komisaris', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional woman portrait', order: 2 },
      { id: '3', name: 'Nama Anggota', role: 'Direktur Utama', image: 'https://placehold.co/400x400.png', dataAiHint: 'male executive portrait', order: 3 },
      { id: '4', name: 'Nama Anggota', role: 'Direktur Operasional', image: 'https://placehold.co/400x400.png', dataAiHint: 'female executive portrait', order: 4 },
      { id: '5', name: 'Nama Anggota', role: 'Direktur Kepatuhan', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional man portrait', order: 5 },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="aspect-square w-full max-w-[200px] mx-auto rounded-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="aspect-square relative max-w-[200px] mx-auto rounded-full overflow-hidden shadow-lg">
                    <Image
                        src={member.image}
                        alt={`Potret ${member.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={member.dataAiHint}
                        unoptimized
                    />
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
