import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Package,
  Star,
  Search,
  Plus,
  Minus,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const CustomerDashboard = () => {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 60,
      unit: "kg",
      stock: 80,
      rating: 4.8,
      seller: "Green Valley Farm",
      quality: "Premium",
      image: "https://images.unsplash.com/photo-1546470427-227c7369676d?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 50,
      unit: "bunch",
      stock: 15,
      rating: 4.6,
      seller: "Sunrise Organics",
      quality: "Good",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Garden Carrots",
      price: 42,
      unit: "kg",
      stock: 60,
      rating: 4.7,
      seller: "Hill View Farm",
      quality: "Premium",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Bell Peppers",
      price: 75,
      unit: "kg",
      stock: 5,
      rating: 4.9,
      seller: "Color Fields",
      quality: "Premium",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Fresh Onions",
      price: 35,
      unit: "kg",
      stock: 0,
      rating: 4.4,
      seller: "Valley Greens",
      quality: "Good",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Organic Potatoes",
      price: 28,
      unit: "kg",
      stock: 100,
      rating: 4.5,
      seller: "Earth Roots",
      quality: "Good",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82ber?w=300&h=300&fit=crop",
    },
  ]);

  const getCartQuantity = (productId: number) => {
    const item = cart.find((c) => c.id === productId);
    return item?.quantity || 0;
  };

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock === 0) return;

    const currentQty = getCartQuantity(productId);
    if (currentQty >= product.stock) {
      toast.error("Maximum available quantity reached");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      if (existing) {
        return prev.map((c) =>
          c.id === productId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((c) =>
          c.id === productId ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prev.filter((c) => c.id !== productId);
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Update stock
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((c) => c.id === p.id);
        if (cartItem) {
          return { ...p, stock: p.stock - cartItem.quantity };
        }
        return p;
      })
    );

    setCart([]);
    toast.success("Order placed successfully! 🎉");
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        {/* Search & Cart Summary */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-leaf/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-leaf" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cart Total</p>
                <p className="text-xl font-bold text-foreground">₹{cartTotal}</p>
              </div>
              <Button
                variant="hero"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Checkout ({cart.reduce((sum, c) => sum + c.quantity, 0)})
              </Button>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const cartQty = getCartQuantity(product.id);
            const isOutOfStock = product.stock === 0;

            return (
              <Card key={product.id} variant="elevated" className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isOutOfStock ? "grayscale" : "group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={isOutOfStock ? "soldout" : "available"}>
                      {isOutOfStock ? "Sold Out" : `${product.stock} left`}
                    </Badge>
                    <Badge variant="quality">{product.quality}</Badge>
                  </div>
                  <button className="absolute top-3 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-secondary mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">• {product.seller}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-3">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                      <span className="text-sm text-muted-foreground">/{product.unit}</span>
                    </div>
                    {cartQty > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{cartQty}</span>
                        <Button
                          variant="hero"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => addToCart(product.id)}
                          disabled={cartQty >= product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        disabled={isOutOfStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
