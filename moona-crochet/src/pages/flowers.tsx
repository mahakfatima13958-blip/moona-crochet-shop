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

export default function Flowers() {
  const { data: products, isLoading } = useListProducts({ category: "flowers" });

  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(12,45%,95%)] via-background to-background pt-20 pb-14">
        <div className="animate-float-slow absolute -top-24 -right-20 h-72 w-72 rounded-full bg-accent/35 blur-3xl pointer-events-none" />
        <div className="animate-float absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary/14 blur-3xl pointer-events-none" />
        <span className="animate-float-delay absolute top-16 left-[12%] text-accent/40 font-serif text-6xl select-none pointer-events-none hidden lg:block">✿</span>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/30 border border-accent/40 text-foreground/70 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            🌸 Ever-blooming
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">Crochet</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Flowers</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Flowers that bloom forever — handcrafted in soft yarn so they never wilt.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Products grid */}
      <section className="container mx-auto px-4 md:px-6 py-14">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground text-right mb-5 font-medium">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" data-testid="flowers-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-serif text-xl">No flowers available right now.</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
