import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Menu,
  X,
  Home,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  User,
  ClipboardCheck,
  Truck,
  Store,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "farmer" | "distributor" | "retailer" | "customer";
}

const roleMenus = {
  farmer: [
    { name: "Dashboard", path: "", icon: Home },
    { name: "My Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Earnings", path: "/earnings", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ],
  distributor: [
    { name: "Dashboard", path: "", icon: Home },
    { name: "Quality Check", path: "/quality", icon: ClipboardCheck },
    { name: "Logistics", path: "/logistics", icon: Truck },
    { name: "Farmers", path: "/farmers", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ],
  retailer: [
    { name: "Dashboard", path: "", icon: Home },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Sales", path: "/sales", icon: TrendingUp },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Settings", path: "/settings", icon: Settings },
  ],
  customer: [
    { name: "Dashboard", path: "", icon: Home },
    { name: "Shop", path: "/shop", icon: Store },
    { name: "My Orders", path: "/orders", icon: ShoppingCart },
    { name: "Wishlist", path: "/wishlist", icon: Package },
    { name: "Settings", path: "/settings", icon: Settings },
  ],
};

const roleColors = {
  farmer: "bg-earth",
  distributor: "bg-secondary",
  retailer: "bg-primary",
  customer: "bg-leaf",
};

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menu = roleMenus[role];
  const basePath = `/dashboard/${role}`;

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${roleColors[role]} flex items-center justify-center`}>
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">AgriTech</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 lg:h-20 flex items-center px-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl ${roleColors[role]} flex items-center justify-center shadow-soft`}>
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-foreground block">AgriTech</span>
                <span className="text-xs text-muted-foreground capitalize">{role} Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menu.map((item) => {
              const fullPath = `${basePath}${item.path}`;
              const isActive = location.pathname === fullPath;
              return (
                <Link
                  key={item.name}
                  to={fullPath}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? `${roleColors[role]} text-primary-foreground shadow-soft`
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-xl mb-3">
              <div className={`w-10 h-10 rounded-full ${roleColors[role]} flex items-center justify-center`}>
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-20 items-center justify-between px-8 border-b border-border bg-card">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground capitalize">
              {role} Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className={`w-10 h-10 rounded-full ${roleColors[role]} flex items-center justify-center`}>
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
