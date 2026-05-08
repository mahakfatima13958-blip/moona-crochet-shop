import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts } from "@workspace/api-client-react";

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

export default function OtherStuff() {
  const { data: products, isLoading } = useListProducts({ category: "other-stuff" });

  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(28,40%,95%)] via-background to-background pt-20 pb-14">
        <div className="animate-float absolute -top-20 right-[5%] h-72 w-72 rounded-full bg-secondary/50 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute -bottom-16 left-[5%] h-56 w-56 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
        <span className="animate-float-slow absolute top-16 right-[18%] text-foreground/10 font-serif text-7xl select-none pointer-events-none hidden lg:block">❋</span>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-secondary/60 text-foreground/70 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            ✨ Handcrafted Goodies
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">Other</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Stuff</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Bags, plushies, accessories — everything handmade and one-of-a-kind.
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5" data-testid="other-stuff-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-xl text-foreground">Nothing here just yet.</p>
            <p className="text-sm text-muted-foreground mt-1">More goodies are being crafted — check back soon!</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
