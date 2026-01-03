
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Newspaper, Award, Package, GalleryHorizontal, FileText } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

async function getCollectionCount(collectionName: string): Promise<number> {
    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        return querySnapshot.size;
    } catch (error) {
        console.error(`Error fetching count for ${collectionName}:`, error);
        return 0;
    }
}

export default function Dashboard() {
  const [counts, setCounts] = useState({
    carousel: 0,
    products: 0,
    awards: 4, // Static for now
    news: 3, // Static for now
    publications: 0,
    team: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      setIsLoading(true);
      const [carouselCount, productCount, publicationCount, teamCount] = await Promise.all([
        getCollectionCount('carousel'),
        getCollectionCount('products'),
        getCollectionCount('publications'),
        getCollectionCount('team'),
      ]);
      setCounts(prev => ({
        ...prev,
        carousel: carouselCount,
        products: productCount,
        publications: publicationCount,
        team: teamCount,
      }));
      setIsLoading(false);
    }
    fetchCounts();
  }, []);

  return (
    <div>
        <div className="flex items-center justify-between space-y-2 mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dasbor</h2>
                <p className="text-muted-foreground">
                    Selamat datang di halaman admin Binarta Luhur.
                </p>
            </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gambar Carousel</CardTitle>
                    <GalleryHorizontal className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : counts.carousel}</div>
                    <p className="text-xs text-muted-foreground">
                        Gambar pada Halaman Utama
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : counts.products}</div>
                    <p className="text-xs text-muted-foreground">
                        Produk unggulan yang ditampilkan
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Penghargaan</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{counts.awards}</div>
                     <p className="text-xs text-muted-foreground">
                        Penghargaan yang diraih
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{counts.news}</div>
                    <p className="text-xs text-muted-foreground">
                        Artikel berita yang dipublikasikan
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Publikasi</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : counts.publications}</div>
                    <p className="text-xs text-muted-foreground">
                        Dokumen yang dipublikasikan
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Anggota Tim</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : counts.team}</div>
                    <p className="text-xs text-muted-foreground">
                        Total anggota tim profesional
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pengguna Admin</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">
                        Akun administrator terdaftar
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    