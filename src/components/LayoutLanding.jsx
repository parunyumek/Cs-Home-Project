import Copyright from "./Copyright";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutLanding = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Copyright />
    </div>
  );
};

export default LayoutLanding;
