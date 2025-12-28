import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/auth/AuthPage";
import FarmerDashboard from "./pages/dashboard/FarmerDashboard";
import DistributorDashboard from "./pages/dashboard/DistributorDashboard";
import RetailerDashboard from "./pages/dashboard/RetailerDashboard";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/:role" element={<AuthPage />} />
          <Route path="/dashboard/farmer/*" element={<FarmerDashboard />} />
          <Route path="/dashboard/distributor/*" element={<DistributorDashboard />} />
          <Route path="/dashboard/retailer/*" element={<RetailerDashboard />} />
          <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
