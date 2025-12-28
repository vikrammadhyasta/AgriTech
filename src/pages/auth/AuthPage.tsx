import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, ArrowLeft, Eye, EyeOff, Users, ShoppingBag, Truck, Store, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database['public']['Enums']['app_role'];

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const roleConfig = {
  customer: {
    title: "Customer",
    icon: Users,
    color: "bg-leaf",
    gradient: "from-leaf to-leaf-light",
    description: "Browse and purchase fresh produce directly from local farmers.",
  },
  farmer: {
    title: "Farmer",
    icon: ShoppingBag,
    color: "bg-earth",
    gradient: "from-earth to-earth-light",
    description: "List your products and reach customers across the region.",
  },
  distributor: {
    title: "Distributor",
    icon: Truck,
    color: "bg-secondary",
    gradient: "from-secondary to-harvest-glow",
    description: "Quality check and distribute products to retailers.",
  },
  retailer: {
    title: "Retailer",
    icon: Store,
    color: "bg-primary",
    gradient: "from-primary to-leaf",
    description: "Stock verified products and serve local customers.",
  },
};

type RoleType = keyof typeof roleConfig;

const AuthPage = () => {
  const { role = "customer" } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { signIn, signUp, user, userRole, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const currentRole = roleConfig[role as RoleType] || roleConfig.customer;
  const IconComponent = currentRole.icon;

  // Redirect if already logged in with an approved role
  useEffect(() => {
    if (!authLoading && user && userRole) {
      navigate(`/dashboard/${userRole}`);
    }
  }, [user, userRole, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const emailResult = emailSchema.safeParse(formData.email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(formData.password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
          return;
        }
        toast.success('Logged in successfully!');
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name, role as AppRole);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in.');
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        if (role === 'customer') {
          toast.success('Account created successfully!');
          navigate('/dashboard/customer');
        } else {
          toast.success('Account created! Your role request is pending admin approval. You will be notified once approved.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${currentRole.gradient} p-12 flex-col justify-between relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-primary-foreground">AgriTech</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className={`w-20 h-20 ${currentRole.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground">
            {currentRole.title} Portal
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-md leading-relaxed">
            {currentRole.description}
          </p>
        </div>

        <div className="relative z-10 flex gap-4">
          {Object.entries(roleConfig).map(([key, value]) => (
            <Link
              key={key}
              to={`/auth/${key}`}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                key === role
                  ? "bg-primary-foreground text-foreground"
                  : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              }`}
              title={value.title}
            >
              <value.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <Card variant="elevated" className="border-0 shadow-card">
            <CardHeader className="text-center pb-2">
              <div className={`w-16 h-16 ${currentRole.color} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:hidden`}>
                <IconComponent className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-display">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? `Sign in to your ${currentRole.title.toLowerCase()} account`
                  : `Register as a ${currentRole.title.toLowerCase()}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setErrors({ ...errors, name: undefined });
                      }}
                      className={`h-12 ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: undefined });
                    }}
                    className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setErrors({ ...errors, password: undefined });
                      }}
                      className={`h-12 pr-12 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-12"
                    />
                  </div>
                )}
                <Button variant="hero" size="lg" className="w-full mt-6" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </CardContent>
          </Card>

          {/* Role Switcher for Mobile */}
          <div className="mt-6 lg:hidden">
            <p className="text-center text-sm text-muted-foreground mb-3">Or login as:</p>
            <div className="flex justify-center gap-3">
              {Object.entries(roleConfig).map(([key, value]) => (
                <Link
                  key={key}
                  to={`/auth/${key}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    key === role
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {value.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
