
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText } from 'lucide-react';
import { firestore } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp, where } from "firebase/firestore";
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Publication {
  id: string;
  url: string;
  title: string;
  category: "Laporan Triwulanan" | "Laporan Tahunan" | "Laporan Tata Kelola";
  createdAt: Timestamp;
}

const PublicationTable = ({ publications, isLoading }: { publications: Publication[], isLoading: boolean }) => {
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), 'dd MMMM yyyy');
  }

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Publikasi</TableHead>
              <TableHead className="hidden md:table-cell">Kategori</TableHead>
              <TableHead className="text-right">Tanggal</TableHead>
              <TableHead className="w-[120px]"><span className="sr-only">Unduh</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-32 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 border rounded-lg">
        <FileText className="mx-auto text-muted-foreground h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">Belum Ada Publikasi</h3>
        <p className="text-muted-foreground mt-2">
          Saat ini belum ada dokumen yang tersedia di kategori ini.
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Publikasi</TableHead>
              <TableHead className="hidden md:table-cell">Kategori</TableHead>
              <TableHead className="text-right">Tanggal</TableHead>
              <TableHead className="w-[120px]"><span className="sr-only">Unduh</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publications.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Button asChild className="w-full">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Unduh
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}


export default function PublikasiPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, "publications"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Publication));
        setPublications(items);
      } catch (err) {
        console.error("Error fetching publications: ", err);
        setError("Gagal memuat data publikasi. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublications();
  }, []);

  const filterByCategory = (category: string) => {
    if (category === 'Semua') return publications;
    return publications.filter(p => p.category === category);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Breadcrumb items={[{label: 'Publikasi'}]} />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Publikasi</h1>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                    Akses laporan triwulanan, laporan tahunan, dan dokumen tata kelola perusahaan kami.
                </p>
            </div>
            
            {error && <p className="text-center text-destructive">{error}</p>}
            
            {!error && (
              <Tabs defaultValue="semua" className="w-full">
                <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 md:grid-cols-4 h-auto mb-8">
                  <TabsTrigger value="semua">Semua</TabsTrigger>
                  <TabsTrigger value="triwulanan">Triwulanan</TabsTrigger>
                  <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
                  <TabsTrigger value="tata-kelola">Tata Kelola</TabsTrigger>
                </TabsList>
                <TabsContent value="semua">
                    <PublicationTable publications={publications} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="triwulanan">
                    <PublicationTable publications={filterByCategory("Laporan Triwulanan")} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="tahunan">
                    <PublicationTable publications={filterByCategory("Laporan Tahunan")} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="tata-kelola">
                    <PublicationTable publications={filterByCategory("Laporan Tata Kelola")} isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
