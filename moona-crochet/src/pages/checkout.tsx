import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart";
import { useCreateOrder } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, ShoppingBag } from "lucide-react";

const WHATSAPP_NUMBER = "923089603471";

function buildWhatsAppOrderMessage(
  customerName: string,
  phone: string,
  address: string,
  items: { name: string; quantity: number; price: number }[],
  total: number
): string {
  const itemLines = items
    .map(i => `• ${i.name} × ${i.quantity} — PKR ${(i.price * i.quantity).toFixed(0)}`)
    .join("\n");
  return `Hi Moona Crochet! 🧶 I'd like to place an order:\n\n*Order Details:*\n${itemLines}\n\n*Total:* PKR ${total.toFixed(0)}\n\n*My Details:*\nName: ${customerName}\nPhone: ${phone}\nAddress: ${address}\n\nPlease confirm my order. Thank you! 💌`;
}

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState({ customerName: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customerName.trim()) newErrors.customerName = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrderViaWhatsApp = () => {
    if (!validate()) return;
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    const msg = buildWhatsAppOrderMessage(form.customerName, form.phone, form.address, items, cartTotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) { toast.error("Your cart is empty"); return; }

    createOrder.mutate(
      {
        data: {
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        },
      },
      {
        onSuccess: (order) => {
          const msg = buildWhatsAppOrderMessage(form.customerName, form.phone, form.address, items, cartTotal);
          clearCart();
          setLocation(`/order-confirmation/${order.id}`);
          setTimeout(() => {
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
          }, 500);
        },
        onError: () => {
          toast.error("Failed to place your order. Please try again.");
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-32 text-center">
          <div className="text-5xl mb-4">🛍️</div>
          <h1 className="font-serif text-3xl font-bold mb-4">Nothing to checkout</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty. Add some items before checking out.</p>
          <Button onClick={() => setLocation("/products")} className="rounded-2xl">Browse Products</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-black mb-1">Checkout</h1>
          <p className="text-muted-foreground text-sm">Fill in your details to place an order.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold mb-6">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.customerName}
                    onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                    className="rounded-xl"
                    data-testid="input-name"
                  />
                  {errors.customerName && <p className="text-destructive text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl"
                    data-testid="input-phone"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="mb-1.5 block text-sm font-medium">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Street address, city, postal code"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="rounded-xl resize-none"
                    rows={3}
                    data-testid="input-address"
                  />
                  {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                </div>

                {/* WhatsApp CTA (primary) */}
                <button
                  type="button"
                  onClick={handleOrderViaWhatsApp}
                  className="w-full py-4 rounded-2xl bg-green-500 text-white font-bold flex items-center justify-center gap-2.5 hover:bg-green-600 active:scale-[0.99] transition-all duration-200 shadow-sm text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border/60" />
                  <span className="text-xs text-muted-foreground font-medium">or</span>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-2xl font-medium gap-2"
                  size="lg"
                  variant="outline"
                  disabled={createOrder.isPending}
                  data-testid="button-place-order"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {createOrder.isPending ? "Placing order..." : "Place Order & Notify via WhatsApp"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  After placing your order, WhatsApp will open automatically with your order details.
                </p>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg">🧶</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">qty {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm flex-shrink-0">PKR {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/60 pt-5">
                <div className="flex justify-between font-black text-xl">
                  <span>Total</span>
                  <span className="text-primary">PKR {cartTotal.toFixed(0)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Delivery charges calculated separately</p>
              </div>
            </div>

            {/* WhatsApp info box */}
            <div className="mt-4 p-5 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="h-4.5 w-4.5 text-green-600" style={{ height: "18px", width: "18px" }} />
              </div>
              <div>
                <p className="text-sm font-bold text-green-800 mb-0.5">Ordering via WhatsApp</p>
                <p className="text-xs text-green-700 leading-relaxed">Your order message will be pre-filled with all item details, your name, phone, and address. Simply tap Send!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
