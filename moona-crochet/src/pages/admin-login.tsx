import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { adminLogin, setAdminToken } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = await adminLogin(username.trim(), password);
      setAdminToken(token);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center px-4">
      {/* Decorative blobs */}
      <div className="fixed -top-32 -left-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-serif text-2xl font-bold text-foreground mb-1">Moona Crochet</p>
          <p className="text-sm text-muted-foreground">Admin Access</p>
        </div>

        {/* Card */}
        <div className="bg-card border rounded-3xl shadow-sm p-8">
          <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 mx-auto mb-6">
            <Lock className="h-5 w-5 text-primary" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-center mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center mb-7">Sign in to manage your store.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                placeholder="admin"
                className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none
                  focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
                  placeholder:text-muted-foreground/50 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none
                  focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
                  placeholder:text-muted-foreground/50 disabled:opacity-60"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl h-11 font-semibold mt-2"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" />Signing in…</>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">← Back to store</a>
        </p>
      </div>
    </div>
  );
}
