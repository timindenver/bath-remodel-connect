import { Link } from "react-router-dom";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Logo centered above columns */}
        <div className="flex justify-center mb-10">
          <img src={logo} alt="SolidSurface Baths logo" className="h-24 w-auto brightness-0 invert opacity-90" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto text-center">
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>(917) 813-0137</li>
              <li>info@solidsurfacebaths.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-primary-foreground/20 text-center text-xs opacity-50">
        © {new Date().getFullYear()} SolidSurfaceBaths.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
