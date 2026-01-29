
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { format } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: "Penuh Waktu" | "Paruh Waktu" | "Magang";
  description: string;
  status: "Dibuka" | "Ditutup";
  flyer: string;
  createdAt: Timestamp;
  validUntil: Timestamp;
}

export default function VacancyDetailPage() {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (typeof id !== 'string') {
        setIsLoading(false);
        setError("ID lowongan tidak valid.");
        return;
    }

    const fetchVacancy = async () => {
      try {
        const docRef = doc(firestore, "vacancies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVacancy({ id: docSnap.id, ...docSnap.data() } as Vacancy);
        } else {
          setError("Lowongan kerja tidak ditemukan.");
          notFound();
        }
      } catch (e) {
        console.error("Error fetching vacancy:", e);
        setError("Gagal memuat data lowongan.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), 'dd MMMM yyyy', { locale: indonesianLocale });
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Breadcrumb 
            items={[
                {label: 'Karir', href: '/karir'},
                {label: vacancy?.title || '...'}
            ]} 
        />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <Card className="max-w-4xl mx-auto shadow-lg border-none overflow-hidden">
            {isLoading ? (
              <div className="p-8">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-5 w-1/2 mb-8" />
                <Skeleton className="w-full aspect-[3/4] mb-8" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-destructive">{error}</p>
                </div>
            ) : vacancy && (
              <>
                <CardHeader className="pb-6">
                  <Badge 
                    variant={vacancy.status === 'Dibuka' ? 'default' : 'secondary'}
                    className="w-fit mb-4"
                  >
                    {vacancy.status}
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl font-headline">{vacancy.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md text-muted-foreground pt-3">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{vacancy.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <span>{vacancy.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Berlaku hingga: {formatDate(vacancy.validUntil)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {vacancy.flyer && (
                    <div className="relative w-full aspect-[3/4] max-h-[800px] bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={vacancy.flyer}
                        alt={`Flayer ${vacancy.title}`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl mb-3 font-headline">Deskripsi Pekerjaan</h3>
                    <div className="prose prose-sm md:prose-base max-w-none text-foreground/80 whitespace-pre-wrap">
                        {vacancy.description}
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
