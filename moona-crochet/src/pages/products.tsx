import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts } from "@workspace/api-client-react";
import { useState } from "react";
import { Search } from "lucide-react";

type Category = "all" | "keychains" | "flowers" | "other-stuff";

const filters: { label: string; value: Category; emoji: string }[] = [
  { label: "All", value: "all", emoji: "✦" },
  { label: "Keychains", value: "keychains", emoji: "🔑" },
  { label: "Flowers", value: "flowers", emoji: "🌸" },
  { label: "Other Stuff", value: "other-stuff", emoji: "✨" },
];

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

export default function Products() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const { data: keychains, isLoading: kLoading } = useListProducts({ category: "keychains" });
  const { data: flowers, isLoading: fLoading } = useListProducts({ category: "flowers" });
  const { data: otherStuff, isLoading: oLoading } = useListProducts({ category: "other-stuff" });

  const isLoading = kLoading || fLoading || oLoading;

  const allProducts = [
    ...(keychains ?? []),
    ...(flowers ?? []),
    ...(otherStuff ?? []),
  ];

  const filtered = allProducts
    .filter(p => activeFilter === "all" || p.category === activeFilter)
    .filter(p => !search.trim() || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(343,58%,96%)] via-background to-background pt-20 pb-12">
        <div className="animate-float absolute -top-20 -left-16 h-64 w-64 rounded-full bg-primary/18 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute -bottom-12 right-[8%] h-56 w-56 rounded-full bg-accent/28 blur-3xl pointer-events-none" />
        <span className="animate-float absolute top-12 right-[16%] text-primary/20 font-serif text-6xl select-none pointer-events-none hidden lg:block">✦</span>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/12 border border-primary/25 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            🧶 Full Collection
          </div>
          <h1 className="font-serif font-black leading-none mb-5">
            <span className="block text-5xl md:text-7xl text-foreground">All</span>
            <span className="block text-5xl md:text-7xl italic text-primary">Products</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xs mx-auto leading-relaxed font-light">
            Every handmade piece, all in one place.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <section className="container mx-auto px-4 md:px-6 py-10">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-card text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span>{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="text-xs text-muted-foreground mb-5 text-right font-medium">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="font-serif text-xl text-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search or filter.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
