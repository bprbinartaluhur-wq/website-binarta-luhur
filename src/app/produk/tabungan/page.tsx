import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TabunganPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-4xl font-headline">Tabungan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">
                        Informasi detail mengenai produk tabungan kami akan segera tersedia.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
