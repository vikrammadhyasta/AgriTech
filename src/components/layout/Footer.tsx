import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">
                AgriTech
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Connecting farmers directly to markets, ensuring fair prices and fresh produce for everyone.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Products", "About Us", "Contact", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Users</h4>
            <ul className="space-y-2">
              {["Farmer Portal", "Distributor Portal", "Retailer Portal", "Customer Shop", "Partner With Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary" />
                <span className="text-sm text-primary-foreground/70">
                  123 Farm Road, Agricultural District, IN 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-sm text-primary-foreground/70">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-sm text-primary-foreground/70">
                  hello@agritech.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 AgriTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
