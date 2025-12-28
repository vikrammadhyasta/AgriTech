import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Users, Award, Globe, CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Sprout,
      title: "Sustainability",
      description: "We promote sustainable farming practices that protect our planet for future generations.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Empowering local farmers and building stronger agricultural communities across the region.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Every product goes through rigorous quality checks before reaching our customers.",
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Complete visibility into the journey of your food from farm to table.",
    },
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "AgriTech was born from a vision to transform agriculture" },
    { year: "2021", title: "500 Farmers", description: "Onboarded our first 500 farmer partners" },
    { year: "2022", title: "50 Cities", description: "Expanded operations to 50 cities nationwide" },
    { year: "2023", title: "1M+ Orders", description: "Crossed one million successful deliveries" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  About AgriTech
                </span>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                  Revolutionizing Agriculture,
                  <br />
                  <span className="text-gradient-hero">One Farm at a Time</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AgriTech is more than a marketplace – we're a movement. We connect farmers 
                  directly with consumers, eliminating middlemen and ensuring fair prices for 
                  everyone in the supply chain.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <p className="text-3xl font-display font-bold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground">Partner Farmers</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <p className="text-3xl font-display font-bold text-primary">10K+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=800&fit=crop"
                    alt="Farmer in field"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do at AgriTech
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} variant="elevated" className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Journey</h2>
              <p className="text-muted-foreground">
                Key milestones in our mission to transform agriculture
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-sm text-muted-foreground mb-1">{milestone.year}</p>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-primary-foreground mb-6">
                Why Choose AgriTech?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  "Direct farmer-to-consumer connection",
                  "Quality-verified produce",
                  "Fair pricing for farmers",
                  "Fresh delivery within 24 hours",
                  "Complete supply chain transparency",
                  "Support for sustainable farming",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
