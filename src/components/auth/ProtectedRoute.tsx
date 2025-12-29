import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: "farmer" | "distributor" | "retailer" | "customer";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          navigate(`/auth/${requiredRole}`);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate(`/auth/${requiredRole}`);
        setLoading(false);
        return;
      }
      
      setSession(session);
      
      // Check user role using setTimeout to avoid deadlock
      setTimeout(() => {
        checkUserRole(session.user.id);
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredRole]);

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role, approval_status")
        .eq("user_id", userId)
        .eq("approval_status", "approved")
        .single();

      if (error || !data) {
        // No approved role found - check if pending
        const { data: pendingRole } = await supabase
          .from("user_roles")
          .select("role, approval_status")
          .eq("user_id", userId)
          .single();

        if (pendingRole?.approval_status === "pending") {
          // Role is pending approval
          navigate("/");
          setLoading(false);
          return;
        }

        // No role at all - redirect to home
        navigate("/");
        setLoading(false);
        return;
      }

      // Check if user has the required role
      if (data.role !== requiredRole) {
        // User has a different role - redirect to their proper dashboard
        navigate(`/dashboard/${data.role}`);
        setLoading(false);
        return;
      }

      setAuthorized(true);
      setLoading(false);
    } catch (error) {
      console.error("Error checking user role:", error);
      navigate("/");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !authorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;