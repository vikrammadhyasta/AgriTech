import { Sprout, Truck, Store, ShoppingCart, ArrowRight } from "lucide-react";

const AboutSection = () => {
  const steps = [
    {
      icon: Sprout,
      title: "Farmers Grow",
      description: "Local farmers cultivate fresh, quality produce using sustainable practices.",
      color: "bg-leaf",
    },
    {
      icon: Truck,
      title: "Distributors Verify",
      description: "Quality checks ensure only the best products reach the market.",
      color: "bg-secondary",
    },
    {
      icon: Store,
      title: "Retailers Stock",
      description: "Retailers receive verified products and set competitive prices.",
      color: "bg-earth",
    },
    {
      icon: ShoppingCart,
      title: "Customers Buy",
      description: "Fresh produce delivered to your doorstep with full transparency.",
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            From Farm to Your Table
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AgriTech creates a transparent supply chain connecting every stakeholder 
            for fresher produce and fairer prices.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-leaf via-secondary to-primary hidden lg:block -translate-y-1/2 opacity-30" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10 items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
