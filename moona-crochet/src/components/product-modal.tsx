import { Product } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { X, ShoppingBag, Check, Tag } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  keychains: "Keychain",
  flowers: "Flower",
  "other-stuff": "Other",
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (product) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`${product.name} added!`, { description: `PKR ${product.price.toFixed(0)}` });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (!product) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full md:w-auto md:max-w-2xl mx-auto bg-card rounded-t-[2rem] md:rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-[0.97] md:translate-y-0"
        }`}
        style={{ maxHeight: "92dvh" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background border border-border/60 transition-all duration-200 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <div className="flex flex-col md:flex-row overflow-y-auto" style={{ maxHeight: "88dvh" }}>
          {/* Image */}
          <div className="relative md:w-[340px] md:flex-shrink-0 bg-gradient-to-br from-primary/10 via-accent/15 to-secondary/20">
            <div className="aspect-square w-full">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-4xl select-none">🧶</span>
                  </div>
                  <span className="font-serif text-sm text-primary/50">No photo yet</span>
                </div>
              )}
            </div>

            {/* Category pill on image */}
            {product.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-foreground/70 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/60">
                  <Tag className="h-2.5 w-2.5" />
                  {categoryLabels[product.category] ?? product.category}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col flex-1 p-6 md:p-8 gap-5">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight mb-3">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary tabular-nums">
                  PKR {product.price.toFixed(0)}
                </span>
              </div>
            </div>

            {product.description && (
              <div className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                {product.description}
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {["Handmade", "Made to Order", "Soft Yarn"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-2 flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                data-testid={`button-add-to-cart-${product.id}`}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm ${
                  added
                    ? "bg-green-500 text-white scale-[0.98]"
                    : "bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
                }`}
              >
                {added ? (
                  <><Check className="h-4 w-4" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
                )}
              </button>

              <p className="text-center text-[11px] text-muted-foreground">
                🧶 Crafted by hand — each piece is one of a kind
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
