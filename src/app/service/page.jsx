import Footer from "@/components/Footer";
import NavbarSticky from "@/components/NavbarSticky";
import ServiceMainSection from "@/components/ServiceMainSection";
import PartnerServicePage from "@/components/PartnerServicePage";

const page = () => {
  return (
    <div>
      <NavbarSticky />
      <ServiceMainSection />
      <PartnerServicePage />
      <Footer />
    </div>
  );
};

export default page;
