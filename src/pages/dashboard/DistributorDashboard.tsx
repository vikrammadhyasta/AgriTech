import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ClipboardCheck,
  Truck,
  AlertTriangle,
  CheckCircle,
  Package,
  User,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DistributorDashboard = () => {
  const [pendingProducts, setPendingProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      quantity: 100,
      price: 45,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1546470427-227c7369676d?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      farmer: "Sunrise Organics",
      quantity: 50,
      price: 35,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Garden Carrots",
      farmer: "Hill View Farm",
      quantity: 75,
      price: 30,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
    },
  ]);

  const [qualityNotes, setQualityNotes] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const stats = [
    { title: "Pending Reviews", value: "15", icon: ClipboardCheck, color: "bg-secondary" },
    { title: "Approved Today", value: "28", icon: CheckCircle, color: "bg-leaf" },
    { title: "Rejected", value: "3", icon: AlertTriangle, color: "bg-destructive" },
    { title: "In Transit", value: "42", icon: Truck, color: "bg-primary" },
  ];

  const handleApprove = (id: number) => {
    if (!selectedGrade) {
      toast.error("Please select a quality grade");
      return;
    }
    setPendingProducts(pendingProducts.filter((p) => p.id !== id));
    toast.success("Product approved and ready for market!");
    setSelectedGrade("");
    setQualityNotes("");
  };

  const handleReject = (id: number) => {
    if (!qualityNotes) {
      toast.error("Please provide rejection notes");
      return;
    }
    setPendingProducts(pendingProducts.filter((p) => p.id !== id));
    toast.success("Product rejected with feedback sent to farmer");
    setQualityNotes("");
  };

  return (
    <DashboardLayout role="distributor">
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
                    <stat.icon className={`w-6 h-6 text-secondary`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Check Section */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-secondary" />
              Pending Quality Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {pendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-xl"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:w-24 h-32 sm:h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{product.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {product.farmer}
                        </div>
                      </div>
                      <Badge variant="warning">Pending Review</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-muted-foreground">
                        <Package className="w-4 h-4 inline mr-1" />
                        {product.quantity} kg
                      </span>
                      <span className="font-semibold text-foreground">₹{product.price}/kg</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="hero" size="sm" className="flex-1 sm:flex-none gap-1">
                          <ThumbsUp className="w-4 h-4" /> Approve
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Quality Assessment</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Quality Grade</label>
                            <div className="grid grid-cols-3 gap-2">
                              {["Premium", "Good", "Average"].map((grade) => (
                                <button
                                  key={grade}
                                  onClick={() => setSelectedGrade(grade)}
                                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                                    selectedGrade === grade
                                      ? "bg-leaf text-primary-foreground border-leaf"
                                      : "border-border hover:border-leaf"
                                  }`}
                                >
                                  {grade}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Notes (Optional)</label>
                            <Textarea
                              placeholder="Add any notes about the product quality..."
                              value={qualityNotes}
                              onChange={(e) => setQualityNotes(e.target.value)}
                            />
                          </div>
                          <Button
                            variant="hero"
                            className="w-full"
                            onClick={() => handleApprove(product.id)}
                          >
                            Confirm Approval
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <ThumbsDown className="w-4 h-4" /> Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Product</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Reason for Rejection</label>
                            <Textarea
                              placeholder="Explain why this product doesn't meet quality standards..."
                              value={qualityNotes}
                              onChange={(e) => setQualityNotes(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleReject(product.id)}
                          >
                            Confirm Rejection
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
              {pendingProducts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-leaf" />
                  <p>All caught up! No pending quality checks.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistributorDashboard;
