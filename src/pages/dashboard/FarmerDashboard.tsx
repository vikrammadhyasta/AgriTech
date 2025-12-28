import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      quantity: 100,
      price: 45,
      unit: "kg",
      status: "Available",
      image: "https://images.unsplash.com/photo-1546470427-227c7369676d?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      quantity: 50,
      price: 35,
      unit: "bunch",
      status: "Approved",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Garden Carrots",
      quantity: 0,
      price: 30,
      unit: "kg",
      status: "Sold Out",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    unit: "kg",
    description: "",
  });

  const stats = [
    { title: "Total Products", value: "12", icon: Package, change: "+2 this week" },
    { title: "Total Earnings", value: "₹45,230", icon: DollarSign, change: "+12% vs last month" },
    { title: "Active Orders", value: "8", icon: ShoppingCart, change: "3 pending delivery" },
    { title: "Growth", value: "+23%", icon: TrendingUp, change: "vs last month" },
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      toast.error("Please fill all required fields");
      return;
    }
    const product = {
      id: Date.now(),
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity),
      price: parseInt(newProduct.price),
      unit: newProduct.unit,
      status: "Available",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82ber?w=200&h=200&fit=crop",
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", quantity: "", price: "", unit: "kg", description: "" });
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge variant="available">{status}</Badge>;
      case "Approved":
        return <Badge variant="success">{status}</Badge>;
      case "Sold Out":
        return <Badge variant="soldout">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout role="farmer">
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
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-earth/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-earth" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Section */}
        <Card variant="elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Products</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" className="gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Name</label>
                    <Input
                      placeholder="e.g., Organic Tomatoes"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Unit</label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="bunch">Bunch</option>
                        <option value="piece">Piece</option>
                        <option value="dozen">Dozen</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price per Unit (₹)</label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe your product..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-border h-24 gap-2"
                  >
                    <ImagePlus className="w-5 h-5" /> Upload Photos
                  </Button>
                  <Button variant="hero" className="w-full" onClick={handleAddProduct}>
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium text-foreground">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {product.quantity} {product.unit}
                      </td>
                      <td className="py-4 px-4 font-semibold text-foreground">
                        ₹{product.price}/{product.unit}
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(product.status)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
