import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-9 w-9 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet. Browse our collection to find something you love.</p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="rounded-2xl gap-2">
                <Link href="/keychains">Shop Keychains</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl gap-2">
                <Link href="/flowers">Shop Flowers</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h1 className="font-serif text-4xl font-bold mb-10">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 bg-card border rounded-2xl p-5 shadow-sm"
                data-testid={`cart-item-${item.id}`}
              >
                {/* Image placeholder */}
                <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <span className="font-serif text-xs text-primary/60 text-center px-2">{item.name}</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-semibold text-lg leading-tight">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">PKR {item.price.toFixed(0)} each</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 rounded-full border bg-background flex items-center justify-center hover:bg-muted transition-colors"
                    data-testid={`decrease-qty-${item.id}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-medium" data-testid={`qty-${item.id}`}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 rounded-full border bg-background flex items-center justify-center hover:bg-muted transition-colors"
                    data-testid={`increase-qty-${item.id}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-foreground">PKR {(item.price * item.quantity).toFixed(0)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 text-muted-foreground hover:text-destructive transition-colors"
                    data-testid={`remove-item-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span>PKR {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">PKR {cartTotal.toFixed(0)}</span>
                </div>
              </div>

              <Button
                onClick={() => setLocation("/checkout")}
                className="w-full rounded-2xl gap-2 font-medium"
                size="lg"
                data-testid="button-checkout"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button>

              <Button asChild variant="ghost" className="w-full mt-3 rounded-2xl">
                <Link href="/keychains">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
