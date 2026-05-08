import { Product } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added!`, {
      description: `PKR ${product.price.toFixed(0)}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/30 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/15 to-secondary/20"
          style={{ aspectRatio: "1 / 1" }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6">
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-2xl select-none">🧶</span>
              </div>
              <span className="font-serif text-xs font-medium text-primary/50 text-center leading-snug mt-1">
                {product.name}
              </span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-white/60 ring-1 ring-primary/10">
              PKR {product.price.toFixed(0)}
            </span>
          </div>

          {/* Quick add overlay (desktop hover) */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-xl text-xs font-bold backdrop-blur-md border transition-all duration-200 ${
                added
                  ? "bg-green-500/90 text-white border-green-400"
                  : "bg-white/90 text-foreground border-white/60 hover:bg-primary hover:text-white hover:border-primary"
              }`}
            >
              {added ? "✓ Added!" : "+ Add to Cart"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-3.5 md:p-4 gap-3">
          <div className="flex-1">
            <h3 className="font-serif text-sm md:text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Mobile add button */}
          <button
            onClick={handleAddToCart}
            className={`md:hidden w-full py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
              added
                ? "bg-green-500 text-white border-green-500"
                : "bg-primary/8 text-primary border-primary/20 hover:bg-primary hover:text-white hover:border-primary"
            }`}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="h-3 w-3" /> Added!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <ShoppingBag className="h-3 w-3" /> Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
