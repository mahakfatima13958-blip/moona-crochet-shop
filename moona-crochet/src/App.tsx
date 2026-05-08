import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { AdminGuard } from "@/components/admin-guard";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Keychains from "@/pages/keychains";
import Flowers from "@/pages/flowers";
import OtherStuff from "@/pages/other-stuff";
import CartPage from "@/pages/cart";
import Checkout from "@/pages/checkout";
import OrderConfirmation from "@/pages/order-confirmation";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/keychains" component={Keychains} />
      <Route path="/flowers" component={Flowers} />
      <Route path="/other-stuff" component={OtherStuff} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:id">
        {(params) => <OrderConfirmation id={params.id!} />}
      </Route>
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        {() => (
          <AdminGuard>
            <Admin />
          </AdminGuard>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
