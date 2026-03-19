const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">SolidSurfaceBaths.com</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Connecting homeowners with certified solid surface bathroom installers across the country.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Find an Installer</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Gallery</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Contact</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>info@solidsurfacebaths.com</li>
            <li>1500 N Grant Street, Suite R</li>
            <li>Denver, Colorado</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-primary-foreground/20 text-center text-xs opacity-50">
        © {new Date().getFullYear()} SolidSurfaceBaths.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
