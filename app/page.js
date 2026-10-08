import Navbar from "@/components/Navbar";
import HeroBillboard from "@/components/HeroBillboard";
import HeatStrip from "@/components/HeatStrip";
import IntroSection from "@/components/IntroSection";
import BurgerShowdown from "@/components/BurgerShowdown";
import BalkanClassics from "@/components/BalkanClassics";
import ChevapiFeature from "@/components/ChevapiFeature";
import MenuSection from "@/components/Menu/MenuSection";
import CevapiRollFeature from "@/components/CevapiRollFeature";
import ShishSection from "@/components/ShishSection";
import SmallBites from "@/components/SmallBites";
import FoodWall from "@/components/FoodWall";
import CurrentSpecial from "@/components/CurrentSpecial";
import DrinksSection from "@/components/DrinksSection";
import FeedbackScoreboard from "@/components/FeedbackScoreboard";
import HalalStrip from "@/components/HalalStrip";
import HoursSection from "@/components/HoursSection";
import LocationBoard from "@/components/LocationBoard";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-warm-yellow focus:px-4 focus:py-2 focus:text-coal"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <HeroBillboard />
        <HeatStrip />
        <IntroSection />
        <BurgerShowdown />
        <BalkanClassics />
        <ChevapiFeature />
        <MenuSection />
        <CevapiRollFeature />
        <ShishSection />
        <SmallBites />
        <FoodWall />
        <CurrentSpecial />
        <DrinksSection />
        <FeedbackScoreboard />
        <HalalStrip />
        <HoursSection />
        <LocationBoard />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
