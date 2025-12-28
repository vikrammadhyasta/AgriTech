import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // Fetch pending role requests
  const { data: pendingRoles, isLoading: rolesLoading } = useQuery({
    queryKey: ['pending-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Fetch all users
  const { data: allUsers } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id, total_amount'),
        supabase.from('profiles').select('id', { count: 'exact' }),
      ]);

      const totalRevenue = ordersRes.data?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

      return {
        products: productsRes.count || 0,
        orders: ordersRes.data?.length || 0,
        users: usersRes.count || 0,
        revenue: totalRevenue,
      };
    },
  });

  // Approve/reject role mutations
  const approveRole = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .update({ approval_status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-roles'] });
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      toast.success('Role approved successfully');
    },
    onError: () => {
      toast.error('Failed to approve role');
    },
  });

  const rejectRole = useMutation({
    mutationFn: async ({ roleId, reason }: { roleId: string; reason: string }) => {
      const { error } = await supabase
        .from('user_roles')
        .update({ approval_status: 'rejected', rejection_reason: reason })
        .eq('id', roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-roles'] });
      toast.success('Role rejected');
    },
    onError: () => {
      toast.error('Failed to reject role');
    },
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive/10 text-destructive';
      case 'farmer': return 'bg-earth/10 text-earth';
      case 'distributor': return 'bg-secondary/10 text-secondary';
      case 'retailer': return 'bg-primary/10 text-primary';
      default: return 'bg-leaf/10 text-leaf';
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, products, and platform settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats?.users || 0}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-leaf/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-leaf" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold">{stats?.products || 0}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">{stats?.orders || 0}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">₹{stats?.revenue?.toLocaleString() || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending Approvals
              {pendingRoles && pendingRoles.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {pendingRoles.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <UserCheck className="w-4 h-4" />
              All Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-secondary" />
                  Pending Role Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rolesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  </div>
                ) : !pendingRoles || pendingRoles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No pending role requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRoles.map((roleRequest: any) => (
                      <div
                        key={roleRequest.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {roleRequest.profiles?.full_name || 'Unknown User'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {roleRequest.profiles?.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Requested: {format(new Date(roleRequest.created_at), 'PPp')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getRoleBadgeColor(roleRequest.role)}>
                            {roleRequest.role}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => rejectRole.mutate({ roleId: roleRequest.id, reason: 'Rejected by admin' })}
                            disabled={rejectRole.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            variant="hero"
                            size="sm"
                            onClick={() => approveRole.mutate(roleRequest.id)}
                            disabled={approveRole.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Approved Users</CardTitle>
              </CardHeader>
              <CardContent>
                {!allUsers || allUsers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No approved users yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allUsers.map((user: any) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.profiles?.full_name || 'Unknown User'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.profiles?.email}
                            </p>
                          </div>
                        </div>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
