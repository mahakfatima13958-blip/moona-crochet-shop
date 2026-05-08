import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Link } from "wouter";
import { Heart, Instagram, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923089603471";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <footer className="border-t border-border/60 bg-foreground text-background/80 py-16 mt-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-black text-background mb-3">Moona Crochet</h3>
              <p className="text-sm text-background/50 leading-relaxed max-w-[240px] mb-5">
                Handmade with love, one stitch at a time.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/moona.croachets03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-background/50 hover:text-background transition-colors duration-200 group"
                >
                  <div className="h-8 w-8 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span>@moona.croachets03</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Moona Crochet! 🧶 I'd like to place an order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-background/50 hover:text-background transition-colors duration-200 group"
                >
                  <div className="h-8 w-8 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Shop</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/products", label: "All Products" },
                  { href: "/keychains", label: "Keychains" },
                  { href: "/flowers", label: "Flowers" },
                  { href: "/other-stuff", label: "Other Stuff" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-background/60 hover:text-background transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Info</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/", label: "Home" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                  { href: "/cart", label: "Cart" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-background/60 hover:text-background transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-background/35">
              © {new Date().getFullYear()} Moona Crochet. All rights reserved.
            </p>
            <p className="text-xs text-background/35 flex items-center gap-1.5">
              Made with <Heart className="h-3 w-3 text-primary/60 fill-primary/60" /> by hand in Pakistan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
