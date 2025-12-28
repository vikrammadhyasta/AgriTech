import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Edit,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RetailerDashboard = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      wholesalePrice: 45,
      retailPrice: 60,
      stock: 80,
      maxStock: 100,
      quality: "Premium",
      sold: 20,
    },
    {
      id: 2,
      name: "Fresh Spinach",
      wholesalePrice: 35,
      retailPrice: 50,
      stock: 15,
      maxStock: 50,
      quality: "Good",
      sold: 35,
    },
    {
      id: 3,
      name: "Garden Carrots",
      wholesalePrice: 30,
      retailPrice: 42,
      stock: 60,
      maxStock: 75,
      quality: "Premium",
      sold: 15,
    },
    {
      id: 4,
      name: "Bell Peppers",
      wholesalePrice: 55,
      retailPrice: 75,
      stock: 5,
      maxStock: 40,
      quality: "Premium",
      sold: 35,
    },
  ]);

  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState("");

  const stats = [
    { title: "Total Inventory", value: "156 kg", icon: Package, color: "bg-primary" },
    { title: "Today's Sales", value: "₹12,450", icon: DollarSign, color: "bg-leaf" },
    { title: "Active Orders", value: "24", icon: ShoppingCart, color: "bg-secondary" },
    { title: "Growth", value: "+18%", icon: TrendingUp, color: "bg-earth" },
  ];

  const handleUpdatePrice = (id: number) => {
    const price = parseInt(newPrice);
    const product = inventory.find((p) => p.id === id);
    if (!product) return;

    const minPrice = product.wholesalePrice * 1.1;
    const maxPrice = product.wholesalePrice * 1.5;

    if (price < minPrice || price > maxPrice) {
      toast.error(`Price must be between ₹${Math.ceil(minPrice)} and ₹${Math.floor(maxPrice)}`);
      return;
    }

    setInventory(
      inventory.map((p) => (p.id === id ? { ...p, retailPrice: price } : p))
    );
    setEditingPrice(null);
    setNewPrice("");
    toast.success("Price updated successfully!");
  };

  const getStockStatus = (stock: number, maxStock: number) => {
    const percentage = (stock / maxStock) * 100;
    if (percentage <= 15) return { color: "bg-destructive", label: "Low Stock" };
    if (percentage <= 40) return { color: "bg-secondary", label: "Medium" };
    return { color: "bg-leaf", label: "In Stock" };
  };

  return (
    <DashboardLayout role="retailer">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-display font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color}/10 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6`} style={{ color: `hsl(var(--primary))` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inventory Management */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Inventory Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.maxStock);
                const stockPercentage = (item.stock / item.maxStock) * 100;

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-muted/50 rounded-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <Badge variant="quality">{item.quality}</Badge>
                          {item.stock <= item.maxStock * 0.15 && (
                            <Badge variant="soldout" className="gap-1">
                              <AlertCircle className="w-3 h-3" /> Low Stock
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>Wholesale: ₹{item.wholesalePrice}/kg</span>
                          <span className="text-foreground font-semibold">
                            Sold: {item.sold} units
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {editingPrice === item.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              className="w-24 h-9"
                              placeholder={item.retailPrice.toString()}
                            />
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => handleUpdatePrice(item.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingPrice(null);
                                setNewPrice("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{item.retailPrice}/kg
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEditingPrice(item.id);
                                setNewPrice(item.retailPrice.toString());
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stock Level</span>
                        <span className={`font-medium ${stockPercentage <= 15 ? "text-destructive" : "text-foreground"}`}>
                          {item.stock} / {item.maxStock} kg
                        </span>
                      </div>
                      <Progress value={stockPercentage} className={`h-2 ${stockStatus.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RetailerDashboard;
