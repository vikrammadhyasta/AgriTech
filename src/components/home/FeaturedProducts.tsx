import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&h=400";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 45,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&h=400",
      rating: 4.8,
      farmer: "Green Valley Farm",
      quality: "Premium",
      available: true,
    },
    {
      id: 2,
      name: "Garden Fresh Spinach",
      price: 35,
      unit: "bunch",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&h=400",
      rating: 4.6,
      farmer: "Sunrise Organics",
      quality: "Good",
      available: true,
    },
    {
      id: 3,
      name: "Fresh Carrots",
      price: 30,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&h=400",
      rating: 4.7,
      farmer: "Hill View Farm",
      quality: "Premium",
      available: true,
    },
    {
      id: 4,
      name: "Organic Potatoes",
      price: 25,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82abe6a2?auto=format&fit=crop&w=400&h=400",
      rating: 4.5,
      farmer: "Earth Roots Farm",
      quality: "Good",
      available: false,
    },
    {
      id: 5,
      name: "Fresh Bell Peppers",
      price: 60,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&h=400",
      rating: 4.9,
      farmer: "Color Fields",
      quality: "Premium",
      available: true,
    },
    {
      id: 6,
      name: "Organic Onions",
      price: 28,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&h=400",
      rating: 4.4,
      farmer: "Valley Greens",
      quality: "Good",
      available: true,
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium mb-4">
              Fresh Picks
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <Button variant="ghost" asChild className="gap-2 self-start md:self-auto">
            <Link to="/products">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              variant="elevated"
              className="overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant={product.available ? "available" : "soldout"}>
                    {product.available ? "Available" : "Sold Out"}
                  </Badge>
                  <Badge variant="quality">{product.quality}</Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-1 text-secondary mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">• {product.farmer}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground">/{product.unit}</span>
                  </div>
                  <Button
                    variant="hero"
                    size="icon"
                    disabled={!product.available}
                    className="rounded-xl"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
