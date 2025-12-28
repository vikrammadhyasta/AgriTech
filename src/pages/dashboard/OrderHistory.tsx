import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useOrders';
import { format } from 'date-fns';
import { 
  Package, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag
} from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-secondary/10 text-secondary' },
  confirmed: { label: 'Confirmed', icon: CheckCircle2, color: 'bg-primary/10 text-primary' },
  processing: { label: 'Processing', icon: Package, color: 'bg-leaf/10 text-leaf' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-accent/10 text-accent' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'bg-leaf/10 text-leaf' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
};

const OrderHistory = () => {
  const { data: orders, isLoading } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <DashboardLayout role="customer">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Order History</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        {!orders || orders.length === 0 ? (
          <Card variant="elevated" className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              Start shopping to see your orders here
            </p>
            <Button variant="hero" asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <Card key={order.id} variant="elevated" className="overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={status.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                      <span className="font-bold text-lg">₹{order.total_amount}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <CardContent className="border-t bg-muted/30 p-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Order Items</h4>
                          <div className="space-y-3">
                            {order.order_items?.map((item: any) => (
                              <div key={item.id} className="flex items-center gap-3 bg-card p-3 rounded-lg">
                                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                                  {item.products?.images?.[0] ? (
                                    <img 
                                      src={item.products.images[0]} 
                                      alt={item.products.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{item.products?.name || 'Unknown Product'}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.quantity} {item.products?.unit || 'units'} × ₹{item.unit_price}
                                  </p>
                                </div>
                                <span className="font-semibold">₹{item.total_price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Delivery Details</h4>
                          <div className="bg-card p-4 rounded-lg space-y-2">
                            <p className="text-sm">
                              <span className="text-muted-foreground">Address:</span>{' '}
                              {order.shipping_address}
                            </p>
                            {order.notes && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Notes:</span>{' '}
                                {order.notes}
                              </p>
                            )}
                          </div>

                          {order.order_tracking && order.order_tracking.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-3">Tracking History</h4>
                              <div className="space-y-2">
                                {order.order_tracking.map((track: any, index: number) => (
                                  <div key={track.id} className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                      index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                                    }`} />
                                    <div>
                                      <p className="font-medium text-sm capitalize">
                                        {track.status.replace('_', ' ')}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(track.created_at), 'PPp')}
                                      </p>
                                      {track.notes && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {track.notes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderHistory;
