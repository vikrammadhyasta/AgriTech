const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Active Farmers" },
    { value: "10K+", label: "Happy Customers" },
    { value: "50+", label: "Cities Covered" },
    { value: "1M+", label: "Products Sold" },
  ];

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
