import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getAdminToken, verifyAdminToken } from "@/lib/admin-auth";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const token = getAdminToken();
      if (!token) {
        if (!cancelled) setStatus("denied");
        return;
      }
      const valid = await verifyAdminToken(token);
      if (!cancelled) setStatus(valid ? "allowed" : "denied");
    }

    check();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (status === "denied") {
      navigate("/admin/login");
    }
  }, [status, navigate]);

  if (status === "checking") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "denied") return null;

  return <>{children}</>;
}
