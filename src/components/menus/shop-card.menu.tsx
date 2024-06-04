import { ShoppingBasketIcon, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge.tsx";
import { useShopCard } from "@/hooks/use-shop-card.store.ts";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { currency } from "@/lib/utils.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

const ShopCardMenu = () => {
  const { products, totalPrice, removeProduct } = useShopCard();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBasketIcon className="h-[1.2rem] w-[1.2rem]" />
            {!!products.length && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0.5">
                {products.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="flex flex-col gap-1">
            {products.length ? (
              <>
                <h4 className="mb-1 font-semibold">Your order:</h4>
                <ScrollArea className="mb-1 h-60 w-full rounded-md border pr-1">
                  <Table>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className="group">
                          <TableCell className="px-2 py-1 font-medium">
                            <Link
                              className="inline-block h-12 w-12"
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
                          <TableCell className="max-w-[32vw] break-words px-2 py-1 md:max-w-min">
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
                          <TableCell className="px-2 py-1 text-center">{product.quantity}</TableCell>
                          <TableCell className="px-2 py-1 text-right">{currency.format(product.price)}</TableCell>
                          <TableCell className="px-2 py-1 text-right">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                removeProduct(product.id);
                              }}
                            >
                              <X className="h-[1.2rem] w-[1.2rem]" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/*<ScrollBar />*/}
                </ScrollArea>
                <div className="mb-3 flex justify-between">
                  <span>Total</span>
                  <span>{currency.format(totalPrice)}</span>
                </div>
                <Button
                  asChild
                  className="ml-auto w-full sm:w-auto"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link to="/checkout">Go to checkout</Link>
                </Button>
              </>
            ) : (
              <>
                <h4 className="font-semibold">Your cart is empty</h4>
                <p>Time to start shopping!</p>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ShopCardMenu;
