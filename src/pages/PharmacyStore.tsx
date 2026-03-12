import { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { medicines, medicineCategories, type Medicine } from "@/data/medicines";
import { toast } from "sonner";

interface CartItem extends Medicine {
  qty: number;
}

export default function PharmacyStore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = medicines.filter((m) => {
    const matchCat = category === "All" || m.category === category;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (med: Medicine) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === med.id);
      if (existing) return prev.map((c) => c.id === med.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...med, qty: 1 }];
    });
    toast.success(`${med.name} added to cart`);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold">Pharmacy</h1>
            <p className="text-muted-foreground">Order medicines for local delivery</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 relative" onClick={() => setShowCart(!showCart)}>
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </div>

      {showCart && cart.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Cart</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded border">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">₹{item.price} × {item.qty}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateQty(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                  <span className="text-sm w-6 text-center">{item.qty}</span>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateQty(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t font-semibold">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>
            <Button className="w-full gap-2" size="lg" onClick={() => toast.success("Order placed! Delivery in 2-4 hours")}>
              <Truck className="h-5 w-5" /> Place Order
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search medicines..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {medicineCategories.map((c) => (
          <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)} className="whitespace-nowrap">{c}</Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((med) => (
          <Card key={med.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm">{med.name}</h3>
                  <p className="text-xs text-muted-foreground">{med.generic} • {med.unit}</p>
                  <p className="text-xs text-muted-foreground mt-1">{med.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-primary">₹{med.price}</span>
                    {med.prescription && <Badge variant="outline" className="text-xs">Rx</Badge>}
                    {!med.inStock && <Badge variant="destructive" className="text-xs">Out of Stock</Badge>}
                  </div>
                </div>
                <Button size="sm" disabled={!med.inStock} onClick={() => addToCart(med)} className="shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
