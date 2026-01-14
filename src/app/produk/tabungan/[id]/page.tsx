
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  requirements: string[];
  dataAiHint?: string;
}

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
        <span>{children}</span>
    </li>
);

export default function SavingProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (typeof id !== 'string') {
        setIsLoading(false);
        setError("ID produk tidak valid.");
        return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.category === 'Tabungan') {
            setProduct({
              id: docSnap.id,
              name: data.name,
              description: data.description,
              image: data.image,
              benefits: data.benefits || [],
              requirements: data.requirements || [],
              dataAiHint: 'savings product illustration'
            });
          } else {
             setError("Produk tidak ditemukan atau bukan produk tabungan.");
             notFound();
          }
        } else {
          setError("Produk tidak ditemukan.");
          notFound();
        }
      } catch (e) {
        console.error("Error fetching product:", e);
        setError("Gagal memuat data produk.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28">
        <Breadcrumb 
            items={[
                {label: 'Produk', href: '/produk'}, 
                {label: 'Tabungan', href: '/produk/tabungan'},
                {label: product?.name || '...'}
            ]} 
        />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <Card className="max-w-5xl mx-auto shadow-lg border-none overflow-hidden">
            {isLoading ? (
              <>
                <Skeleton className="w-full h-64" />
                <CardHeader className="text-center pb-12">
                  <Skeleton className="h-12 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </CardHeader>
                <CardContent className="space-y-16 px-6 md:px-8 pb-12">
                   <Skeleton className="h-96 w-full" />
                </CardContent>
              </>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-destructive">{error}</p>
                </div>
            ) : product && (
              <>
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={`Ilustrasi ${product.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint}
                    unoptimized
                  />
                </div>
                <CardHeader className="text-center pb-12">
                  <CardTitle className="text-4xl md:text-5xl font-headline">{product.name}</CardTitle>
                   <p className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
                        {product.description}
                    </p>
                </CardHeader>
                 <CardContent className="px-6 md:px-8 pb-12">
                     <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {product.benefits.length > 0 && (
                            <div>
                                <h3 className="font-bold text-xl mb-4 font-headline">Keuntungan</h3>
                                <ul className="space-y-2 text-foreground/80">
                                    {product.benefits.map((benefit, i) => (
                                        <ListItem key={i}>{benefit}</ListItem>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {product.requirements.length > 0 && (
                            <div>
                                <h3 className="font-bold text-xl mb-4 font-headline">Persyaratan</h3>
                                <ul className="space-y-2 text-foreground/80">
                                    {product.requirements.map((req, i) => (
                                        <ListItem key={i}>{req}</ListItem>
                                    ))}
                                </ul>
                            </div>
                        )}
                     </div>
                     {product.benefits.length === 0 && product.requirements.length === 0 && (
                        <p className="text-center text-muted-foreground">Informasi detail mengenai produk ini akan segera tersedia.</p>
                     )}
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
