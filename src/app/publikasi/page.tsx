import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import News from '@/components/sections/news';

export default function PublikasiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <News />
      </main>
      <Footer />
    </div>
  );
}
