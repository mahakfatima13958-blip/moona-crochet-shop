import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { useGetOrder, getGetOrderQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package } from "lucide-react";

interface Props {
  id: string;
}

export default function OrderConfirmation({ id }: Props) {
  const orderId = parseInt(id, 10);
  const { data: order, isLoading } = useGetOrder(orderId, {
    query: { enabled: !!orderId, queryKey: getGetOrderQueryKey(orderId) },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-24 text-center">
          <div className="h-10 w-48 bg-muted rounded-xl mx-auto animate-pulse mb-4" />
          <div className="h-4 w-64 bg-muted rounded-xl mx-auto animate-pulse" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Order not found</h1>
          <Button asChild className="rounded-2xl"><Link href="/">Go Home</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-2xl">
        <div className="text-center mb-10">
          <div className="h-20 w-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Order Placed!</h1>
          <p className="text-muted-foreground text-lg">Thank you, {order.customerName}. Your order is confirmed.</p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">Order #{order.id}</h2>
            <span className="ml-auto text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize">
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-muted-foreground">qty {item.quantity}</p>
                </div>
                <span className="font-medium">PKR {(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">PKR {order.total.toFixed(0)}</span>
            </div>
          </div>

          {/* Delivery details */}
          <div className="bg-muted/40 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-medium mb-2">Delivery Details</p>
            <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
            <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
            <p><span className="text-muted-foreground">Address:</span> {order.address}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild className="rounded-2xl">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/keychains">Shop More</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
