import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Package, Palette } from "lucide-react";

const marqueeItems = [
  "Handmade with Love", "✦", "Crochet Keychains", "✦",
  "Crochet Flowers", "✦", "Bags & Plushies", "✦",
  "Custom Orders", "✦", "Made Just for You", "✦",
  "Handmade with Love", "✦", "Crochet Keychains", "✦",
  "Crochet Flowers", "✦", "Bags & Plushies", "✦",
  "Custom Orders", "✦", "Made Just for You", "✦",
];

export default function Home() {
  const { data: keychains, isLoading: kLoading } = useListProducts({ category: "keychains" });
  const { data: flowers, isLoading: fLoading } = useListProducts({ category: "flowers" });
  const { data: otherStuff, isLoading: oLoading } = useListProducts({ category: "other-stuff" });

  const featuredKeychains = keychains?.slice(0, 4);
  const featuredFlowers = flowers?.slice(0, 4);
  const featuredOther = otherStuff?.slice(0, 4);

  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(343,58%,96%)] via-background to-[hsl(28,38%,97%)]">
        {/* Floating blobs */}
        <div className="animate-float absolute top-20 left-[8%] h-64 w-64 rounded-full bg-primary/18 blur-3xl pointer-events-none" />
        <div className="animate-float-slow absolute bottom-24 right-[6%] h-80 w-80 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <div className="animate-float-delay absolute top-1/3 right-[20%] h-40 w-40 rounded-full bg-primary/12 blur-2xl pointer-events-none" />

        {/* Decorative text marks */}
        <span className="animate-float absolute top-20 right-[12%] text-primary/25 font-serif text-7xl select-none pointer-events-none hidden lg:block">✦</span>
        <span className="animate-float-delay absolute bottom-32 left-[14%] text-primary/20 font-serif text-5xl select-none pointer-events-none hidden lg:block">✿</span>
        <span className="animate-float-slow absolute top-40 left-[22%] text-accent/40 font-serif text-4xl select-none pointer-events-none hidden xl:block">❋</span>

        <div className="relative container mx-auto px-4 md:px-6 py-20 text-center">
          {/* Pill badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/12 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/25 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Handmade with love, one stitch at a time</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-2 font-serif font-black leading-[0.9] mb-6">
            <span className="block text-6xl md:text-8xl lg:text-9xl text-foreground">Moona</span>
            <span className="block text-6xl md:text-8xl lg:text-9xl italic text-primary">Crochet</span>
          </h1>

          <p className="animate-fade-up-3 text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed font-light">
            Every piece is carefully crafted by hand — soft, meaningful, and made just for you.
          </p>

          <div className="animate-fade-up-3 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-2xl px-8 font-semibold gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <Link href="/keychains">
                Shop Keychains <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl px-8 font-semibold gap-2 border-2 hover:bg-primary/8 hover:border-primary/40 transition-all duration-200">
              <Link href="/other-stuff">
                Explore Other Stuff
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div className="relative overflow-hidden bg-primary py-3.5 border-y-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <span key={i} className="inline-flex items-center mx-5 text-primary-foreground/90 font-semibold text-sm tracking-wide shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ VALUES ═══ */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Made with Love", desc: "Every stitch is placed with care, intention, and a whole lot of heart.", color: "bg-rose-50 text-rose-500" },
              { icon: Sparkles, title: "Soft & Cozy", desc: "Premium yarns chosen for their softness, color, and durability.", color: "bg-primary/10 text-primary" },
              { icon: Package, title: "Gift Ready", desc: "Beautifully packaged — the perfect gift for someone you love.", color: "bg-amber-50 text-amber-500" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group flex flex-col items-center gap-4 p-8 rounded-3xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center">
                <div className={`h-14 w-14 rounded-2xl ${color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED KEYCHAINS ═══ */}
      <section className="py-20 bg-gradient-to-br from-primary/6 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-[0.15em] mb-2">Bestsellers</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black">Crochet<br /><span className="italic text-primary">Keychains</span></h2>
            </div>
            <Button asChild variant="ghost" className="gap-2 hidden md:flex rounded-2xl font-semibold hover:text-primary">
              <Link href="/keychains">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          {kLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {[1,2,3,4].map(i => <div key={i} className="rounded-2xl bg-muted/50 aspect-square animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {featuredKeychains?.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div className="flex justify-center mt-8 md:hidden">
            <Button asChild variant="outline" className="gap-2 rounded-2xl">
              <Link href="/keychains">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED FLOWERS ═══ */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-[0.15em] mb-2">Ever-lasting</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black">Crochet<br /><span className="italic text-primary">Flowers</span></h2>
            </div>
            <Button asChild variant="ghost" className="gap-2 hidden md:flex rounded-2xl font-semibold hover:text-primary">
              <Link href="/flowers">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          {fLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {[1,2,3,4].map(i => <div key={i} className="rounded-2xl bg-muted/50 aspect-square animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {featuredFlowers?.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div className="flex justify-center mt-8 md:hidden">
            <Button asChild variant="outline" className="gap-2 rounded-2xl">
              <Link href="/flowers">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ CUSTOMIZE BANNER ═══ */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden bg-foreground rounded-[2rem] px-8 md:px-16 py-14 md:py-20 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/15 -translate-y-1/2 translate-x-1/4 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 translate-y-1/2 -translate-x-1/4 blur-2xl" />
            <span className="absolute top-8 left-12 text-white/10 font-serif text-8xl select-none hidden md:block">✦</span>
            <span className="absolute bottom-8 right-12 text-white/10 font-serif text-6xl select-none hidden md:block">✿</span>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-white/15">
                <Palette className="h-3 w-3" /> Custom Orders
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Customize anything<br />
                <span className="italic text-primary/80">according to your style.</span>
              </h2>
              <p className="text-white/55 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Pick your colors, sizes, and designs. Every piece is made to order — your idea, our hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED OTHER STUFF ═══ */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-[0.15em] mb-2">Bags & Plushies</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black">Other<br /><span className="italic text-primary">Stuff</span></h2>
            </div>
            <Button asChild variant="ghost" className="gap-2 hidden md:flex rounded-2xl font-semibold hover:text-primary">
              <Link href="/other-stuff">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          {oLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {[1,2,3,4].map(i => <div key={i} className="rounded-2xl bg-muted/50 aspect-square animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {featuredOther?.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div className="flex justify-center mt-8 md:hidden">
            <Button asChild variant="outline" className="gap-2 rounded-2xl">
              <Link href="/other-stuff">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-lg mx-auto">
            <p className="text-xs text-primary font-bold uppercase tracking-[0.15em] mb-4">Start Shopping</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black mb-5">
              Ready to find<br /><span className="italic text-primary">your piece?</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Browse our full handmade collection — each one crafted with love, just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-2xl px-10 font-semibold gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <Link href="/keychains">Shop Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl px-10 font-semibold border-2">
                <Link href="/flowers">View Flowers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
