
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AboutUs from '@/components/sections/about-us';

export default function SejarahPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
