import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AboutUs from '@/components/sections/about-us';
import OurTeam from '@/components/sections/our-team';
import { Separator } from '@/components/ui/separator';

export default function TentangKamiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <AboutUs />
        <Separator className="my-12 md:my-20" />
        <OurTeam />
      </main>
      <Footer />
    </div>
  );
}
