
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { firestore } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { format } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: "Penuh Waktu" | "Paruh Waktu" | "Magang";
  status: "Dibuka" | "Ditutup";
  validUntil: Timestamp;
}

const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => {
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return format(timestamp.toDate(), 'dd MMMM yyyy', { locale: indonesianLocale });
    }

    return (
        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-xl">{vacancy.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{vacancy.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        <span>{vacancy.type}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Berlaku hingga: {formatDate(vacancy.validUntil)}</span>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full">
                    <Link href={`/karir/${vacancy.id}`}>
                        Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function KarirPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        const q = query(
            collection(firestore, "vacancies"),
            where("status", "==", "Dibuka"), 
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vacancy));
        setVacancies(items);
      } catch (err) {
        console.error("Error fetching vacancies: ", err);
        setError("Gagal memuat data lowongan kerja. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Breadcrumb items={[{label: 'Karir'}]} />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Karir di Binarta Luhur</h1>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                    Temukan peluang karir Anda dan bergabunglah bersama tim kami untuk bertumbuh bersama.
                </p>
            </div>
            
            {error && <p className="text-center text-destructive">{error}</p>}
            
            {!error && (
              <div className="max-w-4xl mx-auto">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                           <Card key={index}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-2/3" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-10 w-full" />
                                </CardFooter>
                           </Card>
                        ))}
                    </div>
                ) : vacancies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {vacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border rounded-lg bg-secondary/30">
                        <Briefcase className="mx-auto text-muted-foreground h-16 w-16 mb-4" />
                        <h3 className="text-xl font-semibold">Belum Ada Lowongan</h3>
                        <p className="text-muted-foreground mt-2">
                        Saat ini belum ada lowongan pekerjaan yang tersedia. Silakan periksa kembali nanti.
                        </p>
                    </div>
                )}
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
