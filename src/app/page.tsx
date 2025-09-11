
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import Awards from '@/components/sections/awards';
import News from '@/components/sections/news-preview';
import AboutUsPreview from '@/components/sections/about-us-preview';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-40">
        <Hero />
        <Products />
        <AboutUsPreview />
        <Separator />
        <Awards />
        <News />
      </main>
      <Footer />
    </div>
  );
}
