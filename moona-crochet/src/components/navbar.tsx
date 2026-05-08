import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/auth-modal";
import { ShoppingBag, Menu, X, Instagram, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/keychains", label: "Keychains" },
    { href: "/flowers", label: "Flowers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const openLogin = () => { setAuthTab("login"); setAuthOpen(true); };
  const openSignup = () => { setAuthTab("signup"); setAuthOpen(true); };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <span className="font-serif text-xl font-bold tracking-wide text-foreground group-hover:text-primary transition-colors duration-200">
                Moona Crochet
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Instagram */}
              <a
                href="https://instagram.com/moona.croachets03"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-xl hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
                title="@moona.croachets03"
              >
                <Instagram className="h-4.5 w-4.5" style={{ height: "18px", width: "18px" }} />
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center h-9 w-9 rounded-xl hover:bg-muted/60 transition-colors duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-sm border-2 border-background" style={{ height: "18px", width: "18px", minWidth: "18px" }}>
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className="flex items-center gap-2 h-9 px-3 rounded-xl hover:bg-muted/60 transition-colors text-sm font-medium"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border/60 rounded-2xl shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-border/60">
                        <p className="text-xs font-bold truncate">{user.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-1.5">
                  <button
                    onClick={openLogin}
                    className="h-9 px-4 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openSignup}
                    className="h-9 px-4 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl hover:bg-muted/60 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                    location === link.href
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-border/60 flex flex-col gap-1">
                <a
                  href="https://instagram.com/moona.croachets03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-muted/60 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Instagram className="h-4 w-4" /> @moona.croachets03
                </a>
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-muted/60 transition-all text-left"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out ({user.name.split(" ")[0]})
                  </button>
                ) : (
                  <div className="flex gap-2 px-2 mt-1">
                    <button onClick={() => { openLogin(); setMobileMenuOpen(false); }} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors">Sign In</button>
                    <button onClick={() => { openSignup(); setMobileMenuOpen(false); }} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">Sign Up</button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </>
  );
}
