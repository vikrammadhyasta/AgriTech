import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Search, Filter, ShoppingCart } from "lucide-react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy"];

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 60,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546470427-227c7369676d?w=400&h=400&fit=crop",
      rating: 4.8,
      farmer: "Green Valley Farm",
      quality: "Premium",
      available: true,
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 50,
      unit: "bunch",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
      rating: 4.6,
      farmer: "Sunrise Organics",
      quality: "Good",
      available: true,
      category: "Vegetables",
    },
    {
      id: 3,
      name: "Garden Carrots",
      price: 42,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
      rating: 4.7,
      farmer: "Hill View Farm",
      quality: "Premium",
      available: true,
      category: "Vegetables",
    },
    {
      id: 4,
      name: "Bell Peppers",
      price: 75,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
      rating: 4.9,
      farmer: "Color Fields",
      quality: "Premium",
      available: true,
      category: "Vegetables",
    },
    {
      id: 5,
      name: "Fresh Onions",
      price: 35,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop",
      rating: 4.4,
      farmer: "Valley Greens",
      quality: "Good",
      available: false,
      category: "Vegetables",
    },
    {
      id: 6,
      name: "Organic Potatoes",
      price: 28,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82abe6a2?w=400&h=400&fit=crop",
      rating: 4.5,
      farmer: "Earth Roots",
      quality: "Good",
      available: true,
      category: "Vegetables",
    },
    {
      id: 7,
      name: "Fresh Apples",
      price: 120,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
      rating: 4.8,
      farmer: "Mountain Orchards",
      quality: "Premium",
      available: true,
      category: "Fruits",
    },
    {
      id: 8,
      name: "Organic Bananas",
      price: 45,
      unit: "dozen",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
      rating: 4.6,
      farmer: "Tropical Farm",
      quality: "Good",
      available: true,
      category: "Fruits",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Fresh From the Farm
            </h1>
            <p className="text-muted-foreground">
              Browse our selection of quality-verified produce from local farmers
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="shrink-0"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} variant="elevated" className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      !product.available ? "grayscale" : "group-hover:scale-105"
                    }`}
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
                  <h3 className="font-display font-semibold text-foreground text-lg mb-3">
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
