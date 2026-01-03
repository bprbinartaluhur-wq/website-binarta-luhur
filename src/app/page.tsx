
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import News from '@/components/sections/news-preview';
import CoreValues from '@/components/sections/core-values';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28">
        <Hero />
        <Products />
        <CoreValues />
        <News />
      </main>
      <Footer />
    </div>
  );
}
