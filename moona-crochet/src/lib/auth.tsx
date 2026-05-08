import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "moona_auth_user";
const ACCOUNTS_KEY = "moona_auth_accounts";

function getAccounts(): Record<string, { name: string; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const accounts = getAccounts();
    const account = accounts[email.toLowerCase()];
    if (account && account.password === password) {
      setUser({ name: account.name, email: email.toLowerCase() });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const accounts = getAccounts();
    accounts[email.toLowerCase()] = { name, password };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser({ name, email: email.toLowerCase() });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
