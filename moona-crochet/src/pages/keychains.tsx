import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts } from "@workspace/api-client-react";
import { ShoppingBag } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border/50">
      <div className="aspect-square bg-muted/50 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 rounded-full bg-muted animate-pulse" />
        <div className="h-8 rounded-xl bg-muted animate-pulse mt-3" />
      </div>
    </div>
  );
}

export default function Keychains() {
  const { data: products, isLoading } = useListProducts({ category: "keychains" });

  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(343,58%,96%)] via-background to-background pt-20 pb-14">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/18 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute -bottom-16 -right-16 h-60 w-60 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <span className="animate-float absolute top-12 right-[15%] text-primary/20 font-serif text-6xl select-none pointer-events-none hidden lg:block">✦</span>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/12 border border-primary/25 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <ShoppingBag className="h-3.5 w-3.5" />
            Handmade Collection
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">Crochet</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Keychains</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Tiny handcrafted charms — soft, sweet, and made just for you.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Products grid */}
      <section className="container mx-auto px-4 md:px-6 py-14">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground text-right mb-5 font-medium">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5" data-testid="keychains-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </div>
            <p className="font-serif text-xl text-foreground">No keychains available right now.</p>
            <p className="text-sm text-muted-foreground mt-1">Check back soon — more are being crafted!</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
