import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import Page from "@/components/page.tsx";
import { useShopCard } from "@/hooks/use-shop-card.store.ts";
import { currency } from "@/lib/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useUserStore } from "@/hooks/use-user.store.ts";
import BillingProfile from "@/routes/_auth/-components/profile/billing.profile.tsx";

export const Route = createLazyFileRoute("/_auth/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { totalPrice, products, addProduct, removeProduct } = useShopCard();
  const { user } = useUserStore();

  return (
    <div className="flex flex-col">
      <Page.H1 className="mb-4">Checkout</Page.H1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 xl:grid-cols-7">
        <Card className="md:col-span-3 xl:col-span-5">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] px-2 py-1 md:px-4 md:py-4">Preview</TableHead>
                  <TableHead className="px-2 py-1 md:px-4 md:py-4">Title</TableHead>
                  <TableHead className="px-2 py-1 text-center md:px-4 md:py-4">Qty</TableHead>
                  <TableHead className="px-2 py-1 text-right md:px-4 md:py-4">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell className="px-2 py-1 md:px-4 md:py-4">
                      <Link
                        className="inline-block h-12 w-12 overflow-hidden rounded-md border md:h-20 md:w-20"
                        to="/products/$productId"
                        params={{
                          productId: `${product.id}`,
                        }}
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-[100%] w-[100%] object-contain transition-all group-hover:scale-105"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="break-words px-2 py-1 md:px-4 md:py-4">
                      <Link
                        to="/products/$productId"
                        params={{
                          productId: `${product.id}`,
                        }}
                        className="transition-all group-hover:opacity-75"
                      >
                        {product.title}
                      </Link>
                    </TableCell>
                    <TableCell className="px-2 py-1 text-center md:px-4 md:py-4">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            removeProduct(product.id);
                          }}
                        >
                          <Minus className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                        <Badge variant="outline">{product.quantity}</Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            addProduct(product);
                          }}
                        >
                          <Plus className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-1 text-right font-semibold md:px-4 md:py-4">
                      {currency.format(product.quantity * product.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="relative md:col-span-2">
          <CardHeader className="sticky top-2">
            <div className="flex w-full justify-between">
              <p className="text-xl">Subtotal:</p>
              <p className="text-2xl font-semibold">{currency.format(totalPrice)}</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <BillingProfile user={user} title="Billing information:" billingType="bank" />
            <Separator className="my-5" />
            <Button> Buy</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
