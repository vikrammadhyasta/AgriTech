import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ShoppingBag, Truck, Store } from "lucide-react";

const HeroSection = () => {
  const roles = [
    { name: "Customer", icon: Users, path: "/auth/customer", color: "bg-leaf" },
    { name: "Farmer", icon: ShoppingBag, path: "/auth/farmer", color: "bg-earth" },
    { name: "Distributor", icon: Truck, path: "/auth/distributor", color: "bg-secondary" },
    { name: "Retailer", icon: Store, path: "/auth/retailer", color: "bg-primary" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-leaf/10 via-transparent to-secondary/5" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-leaf/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-leaf/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
              <span className="text-sm font-medium text-leaf">Fresh from Farm to Your Table</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              From <span className="text-gradient-hero">Farm</span> to{" "}
              <span className="text-gradient-harvest">Market</span>
              <br />
              Made Simple
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              AgriTech connects farmers, distributors, retailers, and customers in one seamless marketplace. Get fresh produce at fair prices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products" className="gap-2">
                  Explore Products <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>

            {/* Role Buttons */}
            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">Quick Access</p>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <Link
                    key={role.name}
                    to={role.path}
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl hover:shadow-soft transition-all hover:-translate-y-0.5 group"
                  >
                    <div className={`w-8 h-8 ${role.color} rounded-lg flex items-center justify-center`}>
                      <role.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{role.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl rotate-3 opacity-20" />
              <div className="absolute inset-4 bg-card rounded-2xl shadow-card overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop"
                  alt="Fresh vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-card p-4 rounded-xl shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-leaf/20 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-leaf" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground">Farmers</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/4 bg-card p-4 rounded-xl shadow-card animate-float" style={{ animationDelay: "-2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">24hr</p>
                    <p className="text-xs text-muted-foreground">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
