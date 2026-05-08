import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import {
  useListOrders,
  useGetOrderSummary,
  useListProducts,
  useUpdateProductImage,
  getListProductsQueryKey,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import { useQueryClient } from "@tanstack/react-query";
import { Package, TrendingUp, Clock, ShoppingBag, ImagePlus, Check, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { clearAdminToken } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";

function StatCard({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string | number }) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold font-serif">{value}</p>
      </div>
    </div>
  );
}

function ProductImageUploader({ productId, productName, currentImageUrl }: {
  productId: number;
  productName: string;
  currentImageUrl?: string | null;
}) {
  const queryClient = useQueryClient();
  const updateImage = useUpdateProductImage();
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [done, setDone] = useState(false);

  const { uploadFile, isUploading } = useUpload({
    onSuccess: async (response) => {
      const imageUrl = `/api/storage${response.objectPath}`;
      updateImage.mutate(
        { id: productId, data: { imageUrl } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({ category: "keychains" }) });
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({ category: "flowers" }) });
            toast.success(`Image updated for ${productName}`);
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          },
          onError: () => {
            toast.error("Failed to save image URL");
          },
        }
      );
    },
    onError: () => {
      toast.error("Upload failed. Please try again.");
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    await uploadFile(file);
  };

  const isBusy = isUploading || updateImage.isPending;

  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0">
      {/* Thumbnail */}
      <div className="h-14 w-14 rounded-xl overflow-hidden bg-primary/8 border flex-shrink-0 flex items-center justify-center">
        {preview ? (
          <img src={preview} alt={productName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-lg">🧶</span>
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{productName}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {preview ? "Image set" : "No image yet"}
        </p>
      </div>

      {/* Upload button */}
      <label
        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all border
          ${isBusy ? "opacity-60 cursor-not-allowed bg-muted text-muted-foreground border-border" :
            done ? "bg-green-50 text-green-700 border-green-200" :
            "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"}`}
        data-testid={`upload-image-${productId}`}
      >
        {isBusy ? (
          <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…</>
        ) : done ? (
          <><Check className="h-3.5 w-3.5" /> Saved</>
        ) : (
          <><ImagePlus className="h-3.5 w-3.5" /> {preview ? "Replace" : "Upload"}</>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={isBusy}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default function Admin() {
  const [, navigate] = useLocation();
  const { data: orders, isLoading: ordersLoading } = useListOrders();
  const { data: summary } = useGetOrderSummary();
  const { data: keychains } = useListProducts({ category: "keychains" });
  const { data: flowers } = useListProducts({ category: "flowers" });
  const { data: otherStuff } = useListProducts({ category: "other-stuff" });
  const allProducts = [...(keychains ?? []), ...(flowers ?? []), ...(otherStuff ?? [])];

  const [tab, setTab] = useState<"orders" | "images">("orders");

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and incoming orders.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="rounded-xl gap-2 flex-shrink-0 mt-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Summary stats */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatCard icon={ShoppingBag} label="Total Orders" value={summary.totalOrders} />
            <StatCard icon={TrendingUp} label="Total Revenue" value={`PKR ${summary.totalRevenue.toFixed(0)}`} />
            <StatCard icon={Clock} label="Pending Orders" value={summary.pendingOrders} />
          </div>
        )}

        {/* Tab bar */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded-2xl w-fit mb-8 border">
          <button
            onClick={() => setTab("orders")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === "orders"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid="tab-orders"
          >
            Orders
          </button>
          <button
            onClick={() => setTab("images")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === "images"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid="tab-images"
          >
            Product Images
          </button>
        </div>

        {/* Orders tab */}
        {tab === "orders" && (
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> All Orders
              </h2>
            </div>

            {ordersLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted/60 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Package className="h-10 w-10 mx-auto mb-4 opacity-30" />
                <p className="font-serif text-lg">No orders yet</p>
                <p className="text-sm mt-1">Orders will appear here once customers start buying.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="orders-table">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Phone</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Items</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Total</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors" data-testid={`order-row-${order.id}`}>
                        <td className="p-4 font-medium">#{order.id}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 max-w-[180px] truncate">{order.address}</p>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{order.phone}</td>
                        <td className="p-4">
                          <div className="max-w-[200px]">
                            {order.items.map((item, i) => (
                              <span key={item.productId} className="text-xs">
                                {item.productName} x{item.quantity}{i < order.items.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-primary">PKR {order.total.toFixed(0)}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString("en-PK", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Product Images tab */}
        {tab === "images" && (
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <ImagePlus className="h-5 w-5 text-primary" /> Product Images
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your own crochet photos. They'll appear immediately on the shop.
                  </p>
                </div>
                <div className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium border border-primary/20 whitespace-nowrap">
                  {allProducts.length} products
                </div>
              </div>
            </div>

            {allProducts.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <p className="font-serif text-lg">Loading products…</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0">
                {/* Keychains column */}
                <div className="p-6 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Keychains ({keychains?.length ?? 0})
                  </p>
                  {keychains?.map((p) => (
                    <ProductImageUploader
                      key={p.id}
                      productId={p.id}
                      productName={p.name}
                      currentImageUrl={p.imageUrl}
                    />
                  ))}
                </div>

                {/* Flowers column */}
                <div className="p-6 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Flowers ({flowers?.length ?? 0})
                  </p>
                  {flowers?.map((p) => (
                    <ProductImageUploader
                      key={p.id}
                      productId={p.id}
                      productName={p.name}
                      currentImageUrl={p.imageUrl}
                    />
                  ))}
                </div>

                {/* Other Stuff column */}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Other Stuff ({otherStuff?.length ?? 0})
                  </p>
                  {otherStuff?.map((p) => (
                    <ProductImageUploader
                      key={p.id}
                      productId={p.id}
                      productName={p.name}
                      currentImageUrl={p.imageUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
