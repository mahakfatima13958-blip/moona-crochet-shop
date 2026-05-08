import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout";
import { useListProducts } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ShoppingBag, Check, ArrowLeft, MessageCircle, Tag } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "923089603471";

const categoryLabels: Record<string, string> = {
  keychains: "Keychain",
  flowers: "Flower",
  "other-stuff": "Other Stuff",
};

const categoryPaths: Record<string, string> = {
  keychains: "/keychains",
  flowers: "/flowers",
  "other-stuff": "/other-stuff",
};

function buildWhatsAppUrl(productName: string, price: number): string {
  const msg = `Hi Moona Crochet! 🧶 I'd like to order:\n\n*${productName}*\nPrice: PKR ${price.toFixed(0)}\n\nPlease let me know about availability and delivery details. 💌`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function ProductDetail(_props: { id?: string }) {
  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id ?? _props.id ?? "0");

  const { data: keychains } = useListProducts({ category: "keychains" });
  const { data: flowers } = useListProducts({ category: "flowers" });
  const { data: otherStuff } = useListProducts({ category: "other-stuff" });

  const allProducts = [...(keychains ?? []), ...(flowers ?? []), ...(otherStuff ?? [])];
  const product = allProducts.find(p => p.id === productId);

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isLoading = !keychains && !flowers && !otherStuff;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-24">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square rounded-3xl bg-muted/50 animate-pulse" />
            <div className="space-y-4 pt-4">
              <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
              <div className="h-10 w-3/4 rounded-xl bg-muted animate-pulse" />
              <div className="h-8 w-1/3 rounded-xl bg-muted animate-pulse" />
              <div className="h-24 rounded-xl bg-muted animate-pulse" />
              <div className="h-12 rounded-2xl bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-32 text-center">
          <div className="text-5xl mb-4">🧶</div>
          <h1 className="font-serif text-3xl font-black mb-3">Product not found</h1>
          <p className="text-muted-foreground mb-8">This item doesn't exist or may have been removed.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
            <ArrowLeft className="h-4 w-4" /> Browse Products
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added!`, { description: `PKR ${product.price.toFixed(0)}` });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const whatsappUrl = buildWhatsAppUrl(product.name, product.price);
  const backPath = product.category ? (categoryPaths[product.category] ?? "/products") : "/products";

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={backPath} className="hover:text-primary transition-colors capitalize">
            {product.category ? (categoryLabels[product.category] ?? "Products") : "Products"}s
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[160px]">{product.name}</span>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/15 to-secondary/20 shadow-lg">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-5xl">🧶</span>
                  </div>
                  <span className="font-serif text-base text-primary/50">No image available</span>
                </div>
              )}
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Category + badge */}
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/12 text-primary border border-primary/20">
                  <Tag className="h-2.5 w-2.5" />
                  {categoryLabels[product.category] ?? product.category}
                </span>
              )}
              {["Handmade", "Made to Order"].map(b => (
                <span key={b} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border/60">
                  {b}
                </span>
              ))}
            </div>

            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-3">{product.name}</h1>
              <div className="text-4xl font-black text-primary tabular-nums">
                PKR {product.price.toFixed(0)}
              </div>
            </div>

            {product.description && (
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                {product.description}
              </p>
            )}

            {/* Info boxes */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Material", value: "Soft Cotton Yarn" },
                { label: "Made in", value: "Pakistan 🇵🇰" },
                { label: "Delivery", value: "3–5 business days" },
                { label: "Orders", value: "Made to order" },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-muted/40 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-xs font-semibold mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 hover:bg-green-600 active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                Order via WhatsApp
              </a>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 border-2 transition-all duration-200 ${
                  added
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-transparent text-primary border-primary/40 hover:bg-primary/8"
                }`}
              >
                {added ? (
                  <><Check className="h-4 w-4" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              🧶 Each piece is handcrafted with love — no two are exactly alike
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-4xl mx-auto mt-14 pt-8 border-t border-border/50">
          <Link href={backPath} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to {product.category ? (categoryLabels[product.category] ?? "Products") + "s" : "Products"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
